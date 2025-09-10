const BUFFER_SIZE = 1000;

export const compute = async () => {
    const { device } = await getStuff();

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 1,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: 'storage' as GPUBufferBindingType,
                },
            },
        ],
    });

    const output = device.createBuffer({
        size: BUFFER_SIZE,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const stagingBuffer = device.createBuffer({
        size: BUFFER_SIZE,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
            {
                binding: 1,
                resource: {
                    buffer: output,
                },
            },
        ],
    });

    const module = device.createShaderModule({
        code: `
            @group(0) @binding(1)
            var<storage, read_write> output: array<f32>;

            @compute @workgroup_size(64)
            fn main(
                @builtin(global_invocation_id)
                global_id : vec3<u32>,

                @builtin(local_invocation_id)
                local_id : vec3<u32>,
            ) {
                if(global_id.x >= arrayLength(&output)) {
                    return;
                }
                output[global_id.x] = f32(global_id.x) * 1000. + f32(local_id.x);
            }
        `,
    });

    const pipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout],
        }),
        compute: {
            module,
            entryPoint: 'main',
        },
    });

    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));
    passEncoder.end();
    commandEncoder.copyBufferToBuffer(
        output,
        0, // Source offset
        stagingBuffer,
        0, // Destination offset
        BUFFER_SIZE
    );
    const commands = commandEncoder.finish();
    device.queue.submit([commands]);

    await stagingBuffer.mapAsync(
        GPUMapMode.READ,
        0, // Offset
        BUFFER_SIZE // Length
    );
    const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
    const data = copyArrayBuffer.slice(0);
    stagingBuffer.unmap();
    console.log(new Float32Array(data));
};

const getStuff = async () => {
    if (!window.navigator.gpu) throw Error('WebGPU not supported.');

    const adapter = await window.navigator.gpu.requestAdapter();
    if (!adapter) throw Error('Couldn’t request WebGPU adapter.');

    const device = await adapter.requestDevice();
    if (!device) throw Error('Couldn’t request WebGPU logical device.');
    return { device, adapter };
};
