@group(0) @binding(0)
var<storage, read> input: array<array<vec4<u32>>>;

@group(0) @binding(1)
var<storage, read_write> output: array<array<vec4<u32>>>;

struct Image {
    width: u32,
    height: u32,
}
@group(0) @binding(2)
var<storage, read> image: Image;

struct Params {
    horizontal: bool,
    vertical: bool,
}
@group(0) @binding(3)
var<storage, read> params: Params;

@compute @workgroup_size(64)
fn main(
    @builtin(global_invocation_id)
    global_id : vec3<u32>,
) {
    if(global_id.y >= image.height || global_id.x >= image.width) {
        return;
    }

    let x = params.vertical ? image.width - 1 - global_id.x : global_id.x;
    let y = params.horizontal ? global_id.y : image.height - 1 - global_id.y;

    output[global_id.x][global_id.y] = input[x][y];
}
