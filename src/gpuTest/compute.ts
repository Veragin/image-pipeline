import code from './mirror.wgsl?raw';

const IMAGE_SIZE = 512;
const BUFFER_SIZE = IMAGE_SIZE * IMAGE_SIZE * 4;

export const compute = async () => {
    const { device } = await getStuff();

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: 'read-only-storage' as GPUBufferBindingType,
                },
            },
            {
                binding: 1,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: 'storage' as GPUBufferBindingType,
                },
            },
            {
                binding: 2,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: 'read-only-storage' as GPUBufferBindingType,
                },
            },
            {
                binding: 3,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: 'read-only-storage' as GPUBufferBindingType,
                },
            },
        ],
    });

    const inputBuffer = device.createBuffer({
        size: BUFFER_SIZE,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const imageBuffer = device.createBuffer({
        size: 2,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const paramsBuffer = device.createBuffer({
        size: 2,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
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
                binding: 0,
                resource: {
                    buffer: inputBuffer,
                },
            },
            {
                binding: 1,
                resource: {
                    buffer: outputBuffer,
                },
            },
            {
                binding: 2,
                resource: {
                    buffer: imageBuffer,
                },
            },
            {
                binding: 3,
                resource: {
                    buffer: paramsBuffer,
                },
            },
        ],
    });

    const module = device.createShaderModule({
        code,
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

    let inputBalls = new Int32Array(new Int32Array(new ArrayBuffer(IMAGE_SIZE)));
    for (let x = 0; x < IMAGE_SIZE; x++) {
        for (let y = 0; y < IMAGE_SIZE; y++) {
            inputBalls[y * IMAGE_SIZE + x] = x + y;
            inputBalls[y * IMAGE_SIZE + x + 1] = x + y;
            inputBalls[y * IMAGE_SIZE + x + 2] = x + y;
            inputBalls[y * IMAGE_SIZE + x + 3] = 0;
        }
    }
    const imageBall = new Int32Array([IMAGE_SIZE, IMAGE_SIZE]);
    const paramsBall = new Int32Array([1, 1]);

    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));
    passEncoder.end();

    device.queue.writeBuffer(inputBuffer, 0, inputBalls);
    device.queue.writeBuffer(imageBuffer, 0, imageBall);
    device.queue.writeBuffer(paramsBuffer, 0, paramsBall);
    commandEncoder.copyBufferToBuffer(
        outputBuffer,
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
    console.log(new Int32Array(data));
};

const getStuff = async () => {
    if (!window.navigator.gpu) throw Error('WebGPU not supported.');

    const adapter = await window.navigator.gpu.requestAdapter();
    if (!adapter) throw Error('Couldn’t request WebGPU adapter.');

    const device = await adapter.requestDevice();
    if (!device) throw Error('Couldn’t request WebGPU logical device.');
    return { device, adapter };
};
