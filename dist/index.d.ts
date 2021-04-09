// ****************************************************************
// NOTE:
// Every change to this file should be tracked here so that we know
// the exact status relative to the upstream spec (except bugfixes
// that bring the file in-line with this tracking).
// ****************************************************************
//
// This revision of the types is based on:
// https://github.com/gpuweb/gpuweb/blob/38236513beaf98e1579b212c0df6f33bd19691ab/spec/index.bs
// - except #494: reverted the addition of GPUAdapter.limits
// - except #591: removed Uint32Array from GPUShaderModuleDescriptor
// - except removal of old setIndexBuffer signature in #943
// - plus #873: added aspect back to GPUTextureCopyView
// - plus #971: added stencil8 to GPUTextureFormat
// - plus #1168: renamed OUTPUT_ATTACHMENT to RENDER_ATTACHMENT
// - plus #1367: renamed defaultQueue to queue
// - plus #1014: made bytesPerRow optional
// - plus #1375: renamed to GPUImageCopyX (but without removing old names)
// - plus #1390: renamed depth to depthOrArrayLayers
// - plus #1152+#1441: made height/depthOrArrayLayers optional
// - plus #1328: add texture dimension limits
// - plus #1322+#1469: rename vertex formats
// - plus #1352: refactor GPURenderPipelineDescriptor
// - plus #1185: update getSwapChainPreferredFormat
// - plus #1336: createReady*Pipeline -> create*PipelineAsync

declare global {
  // *********************************************************************************************
  // Manually-written
  // *********************************************************************************************

  interface HTMLCanvasElement {
    getContext(contextId: "gpupresent"): GPUCanvasContext | null;
  }
  interface OffscreenCanvas {
    getContext(contextId: "gpupresent"): GPUCanvasContext | null;
  }

  // *********************************************************************************************
  // Semi-auto-generated (by manual diff with autogenerated types)
  // *********************************************************************************************

  interface GPUObjectBase {
    label: string | null;
  }
  interface GPUObjectDescriptorBase {
    label?: string;
  }
  interface GPULimits {
    maxTextureDimension1D?: number;
    maxTextureDimension2D?: number;
    maxTextureDimension3D?: number;
    maxTextureArrayLayers?: number;
    maxBindGroups?: number;
    maxDynamicUniformBuffersPerPipelineLayout?: number;
    maxDynamicStorageBuffersPerPipelineLayout?: number;
    maxSampledTexturesPerShaderStage?: number;
    maxSamplersPerShaderStage?: number;
    maxStorageBuffersPerShaderStage?: number;
    maxStorageTexturesPerShaderStage?: number;
    maxUniformBuffersPerShaderStage?: number;
    maxUniformBufferBindingSize?: number;
  }
  interface Navigator {
    readonly gpu: GPU | undefined;
  }
  interface WorkerNavigator {
    readonly gpu: GPU | undefined;
  }
  var GPU: { readonly prototype: GPU; new (): never };
  interface GPU {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPU";
    requestAdapter(
      options?: GPURequestAdapterOptions
    ): Promise<GPUAdapter | null>;
  }
  interface GPURequestAdapterOptions {
    powerPreference?: GPUPowerPreference;
  }
  type GPUPowerPreference = "low-power" | "high-performance";
  var GPUAdapter: { readonly prototype: GPUAdapter; new (): never };
  interface GPUAdapter {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUAdapter";
    readonly name: string;
    readonly extensions: GPUExtensionName[];
    readonly limits: Required<GPULimits>;
    requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
  }
  interface GPUDeviceDescriptor extends GPUObjectDescriptorBase {
    extensions?: Iterable<GPUExtensionName>;
    limits?: GPULimits;
  }
  type GPUExtensionName =
    | "depth-clamping"
    | "depth24unorm-stencil8"
    | "depth32float-stencil8"
    | "pipeline-statistics-query"
    | "texture-compression-bc"
    | "timestamp-query";
  var GPUDevice: { readonly prototype: GPUDevice; new (): never };
  interface GPUDevice extends EventTarget, GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUDevice";
    /** @deprecated */
    readonly adapter: GPUAdapter;
    readonly extensions: ReadonlyArray<GPUExtensionName>;
    readonly limits: Required<GPULimits>;
    readonly queue: GPUQueue;
    destroy(): undefined;
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
    createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
    createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;
    createBindGroupLayout(
      descriptor: GPUBindGroupLayoutDescriptor
    ): GPUBindGroupLayout;
    createPipelineLayout(
      descriptor: GPUPipelineLayoutDescriptor
    ): GPUPipelineLayout;
    createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
    createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
    createComputePipeline(
      descriptor: GPUComputePipelineDescriptor
    ): GPUComputePipeline;
    createRenderPipeline(
      descriptor: GPURenderPipelineDescriptor
    ): GPURenderPipeline;
    createComputePipelineAsync(
      descriptor: GPUComputePipelineDescriptor
    ): Promise<GPUComputePipeline>;
    /** @deprecated */
    createReadyComputePipeline(
      descriptor: GPUComputePipelineDescriptor
    ): Promise<GPUComputePipeline>;
    createRenderPipelineAsync(
      descriptor: GPURenderPipelineDescriptor
    ): Promise<GPURenderPipeline>;
    /** @deprecated */
    createReadyRenderPipeline(
      descriptor: GPURenderPipelineDescriptor
    ): Promise<GPURenderPipeline>;
    createCommandEncoder(
      descriptor?: GPUCommandEncoderDescriptor
    ): GPUCommandEncoder;
    createRenderBundleEncoder(
      descriptor: GPURenderBundleEncoderDescriptor
    ): GPURenderBundleEncoder;
    createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
    readonly lost: Promise<GPUDeviceLostInfo>;
    pushErrorScope(filter: GPUErrorFilter): undefined;
    popErrorScope(): Promise<GPUError | null>;
    onuncapturederror:
      | ((this: GPUDevice, ev: GPUUncapturedErrorEvent) => any)
      | null;
  }
  var GPUBuffer: { readonly prototype: GPUBuffer; new (): never };
  interface GPUBuffer extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUBuffer";
    mapAsync(
      mode: GPUMapModeFlags,
      offset?: GPUSize64,
      size?: GPUSize64
    ): Promise<undefined>;
    getMappedRange(offset?: GPUSize64, size?: GPUSize64): ArrayBuffer;
    unmap(): undefined;
    destroy(): undefined;
  }
  interface GPUBufferDescriptor extends GPUObjectDescriptorBase {
    size: GPUSize64;
    usage: GPUBufferUsageFlags;
    mappedAtCreation?: boolean;
  }
  type GPUBufferUsageFlags = number;
  var GPUBufferUsage: {
    readonly MAP_READ: GPUFlagsConstant;
    readonly MAP_WRITE: GPUFlagsConstant;
    readonly COPY_SRC: GPUFlagsConstant;
    readonly COPY_DST: GPUFlagsConstant;
    readonly INDEX: GPUFlagsConstant;
    readonly VERTEX: GPUFlagsConstant;
    readonly UNIFORM: GPUFlagsConstant;
    readonly STORAGE: GPUFlagsConstant;
    readonly INDIRECT: GPUFlagsConstant;
    readonly QUERY_RESOLVE: GPUFlagsConstant;
  };
  type GPUMapModeFlags = number;
  var GPUMapMode: {
    readonly READ: GPUFlagsConstant;
    readonly WRITE: GPUFlagsConstant;
  };
  var GPUTexture: { readonly prototype: GPUTexture; new (): never };
  interface GPUTexture extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUTexture";
    createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
    destroy(): undefined;
  }
  interface GPUTextureDescriptor extends GPUObjectDescriptorBase {
    size: GPUExtent3DStrict;
    mipLevelCount?: GPUIntegerCoordinate;
    sampleCount?: GPUSize32;
    dimension?: GPUTextureDimension;
    format: GPUTextureFormat;
    usage: GPUTextureUsageFlags;
  }
  type GPUTextureDimension = "1d" | "2d" | "3d";
  type GPUTextureUsageFlags = number;
  var GPUTextureUsage: {
    readonly COPY_SRC: GPUFlagsConstant;
    readonly COPY_DST: GPUFlagsConstant;
    readonly SAMPLED: GPUFlagsConstant;
    readonly STORAGE: GPUFlagsConstant;
    readonly RENDER_ATTACHMENT: GPUFlagsConstant;
  };
  var GPUTextureView: { readonly prototype: GPUTextureView; new (): never };
  interface GPUTextureView extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUTextureView";
  }
  interface GPUTextureViewDescriptor extends GPUObjectDescriptorBase {
    format?: GPUTextureFormat;
    dimension?: GPUTextureViewDimension;
    aspect?: GPUTextureAspect;
    baseMipLevel?: GPUIntegerCoordinate;
    mipLevelCount?: GPUIntegerCoordinate;
    baseArrayLayer?: GPUIntegerCoordinate;
    arrayLayerCount?: GPUIntegerCoordinate;
  }
  type GPUTextureViewDimension =
    | "1d"
    | "2d"
    | "2d-array"
    | "cube"
    | "cube-array"
    | "3d";
  type GPUTextureAspect = "all" | "stencil-only" | "depth-only";
  type GPUTextureFormat =
    | "r8unorm"
    | "r8snorm"
    | "r8uint"
    | "r8sint"
    | "r16uint"
    | "r16sint"
    | "r16float"
    | "rg8unorm"
    | "rg8snorm"
    | "rg8uint"
    | "rg8sint"
    | "r32uint"
    | "r32sint"
    | "r32float"
    | "rg16uint"
    | "rg16sint"
    | "rg16float"
    | "rgba8unorm"
    | "rgba8unorm-srgb"
    | "rgba8snorm"
    | "rgba8uint"
    | "rgba8sint"
    | "bgra8unorm"
    | "bgra8unorm-srgb"
    | "rgb9e5ufloat"
    | "rgb10a2unorm"
    | "rg11b10ufloat"
    | "rg32uint"
    | "rg32sint"
    | "rg32float"
    | "rgba16uint"
    | "rgba16sint"
    | "rgba16float"
    | "rgba32uint"
    | "rgba32sint"
    | "rgba32float"
    | "stencil8"
    | "depth16unorm"
    | "depth24plus"
    | "depth24plus-stencil8"
    | "depth32float"
    | "bc1-rgba-unorm"
    | "bc1-rgba-unorm-srgb"
    | "bc2-rgba-unorm"
    | "bc2-rgba-unorm-srgb"
    | "bc3-rgba-unorm"
    | "bc3-rgba-unorm-srgb"
    | "bc4-r-unorm"
    | "bc4-r-snorm"
    | "bc5-rg-unorm"
    | "bc5-rg-snorm"
    | "bc6h-rgb-ufloat"
    | "bc6h-rgb-float"
    | "bc7-rgba-unorm"
    | "bc7-rgba-unorm-srgb"
    | "depth24unorm-stencil8"
    | "depth32float-stencil8";
  var GPUSampler: { readonly prototype: GPUSampler; new (): never };
  interface GPUSampler extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUSampler";
  }
  interface GPUSamplerDescriptor extends GPUObjectDescriptorBase {
    addressModeU?: GPUAddressMode;
    addressModeV?: GPUAddressMode;
    addressModeW?: GPUAddressMode;
    magFilter?: GPUFilterMode;
    minFilter?: GPUFilterMode;
    mipmapFilter?: GPUFilterMode;
    lodMinClamp?: number;
    lodMaxClamp?: number;
    compare?: GPUCompareFunction;
    maxAnisotropy?: number;
  }
  type GPUAddressMode = "clamp-to-edge" | "repeat" | "mirror-repeat";
  type GPUFilterMode = "nearest" | "linear";
  type GPUCompareFunction =
    | "never"
    | "less"
    | "equal"
    | "less-equal"
    | "greater"
    | "not-equal"
    | "greater-equal"
    | "always";
  var GPUBindGroupLayout: {
    readonly prototype: GPUBindGroupLayout;
    new (): never;
  };
  interface GPUBindGroupLayout extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUBindGroupLayout";
  }
  interface GPUBindGroupLayoutDescriptor extends GPUObjectDescriptorBase {
    entries: Iterable<GPUBindGroupLayoutEntry>;
  }
  type GPUShaderStageFlags = number;
  var GPUShaderStage: {
    readonly VERTEX: GPUFlagsConstant;
    readonly FRAGMENT: GPUFlagsConstant;
    readonly COMPUTE: GPUFlagsConstant;
  };
  interface GPUBindGroupLayoutEntry {
    binding: GPUIndex32;
    visibility: GPUShaderStageFlags;
    buffer?: GPUBufferBindingLayout;
    sampler?: GPUSamplerBindingLayout;
    texture?: GPUTextureBindingLayout;
    storageTexture?: GPUStorageTextureBindingLayout;
    /** @deprecated */
    type?: GPUBindingType;
    /** @deprecated */
    hasDynamicOffset?: boolean;
    /** @deprecated */
    minBufferBindingSize?: number;
    /** @deprecated */
    viewDimension?: GPUTextureViewDimension;
    /** @deprecated */
    textureComponentType?: GPUTextureComponentType;
    /** @deprecated */
    storageTextureFormat?: GPUTextureFormat;
  }
  type GPUBufferBindingType = "uniform" | "storage" | "read-only-storage";
  interface GPUBufferBindingLayout {
    type?: GPUBufferBindingType;
    hasDynamicOffset?: boolean;
    minBindingSize?: GPUSize64;
  }
  type GPUSamplerBindingType = "filtering" | "non-filtering" | "comparison";
  interface GPUSamplerBindingLayout {
    type?: GPUSamplerBindingType;
  }
  type GPUTextureSampleType =
    | "float"
    | "unfilterable-float"
    | "depth"
    | "sint"
    | "uint";
  interface GPUTextureBindingLayout {
    sampleType?: GPUTextureSampleType;
    viewDimension?: GPUTextureViewDimension;
    multisampled?: boolean;
  }
  type GPUStorageTextureAccess = "read-only" | "write-only";
  interface GPUStorageTextureBindingLayout {
    access: GPUStorageTextureAccess;
    format: GPUTextureFormat;
    viewDimension?: GPUTextureViewDimension;
  }
  var GPUBindGroup: { readonly prototype: GPUBindGroup; new (): never };
  interface GPUBindGroup extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUBindGroup";
  }
  interface GPUBindGroupDescriptor extends GPUObjectDescriptorBase {
    layout: GPUBindGroupLayout;
    entries: Iterable<GPUBindGroupEntry>;
  }
  type GPUBindingResource = GPUSampler | GPUTextureView | GPUBufferBinding;
  interface GPUBindGroupEntry {
    binding: GPUIndex32;
    resource: GPUBindingResource;
  }
  interface GPUBufferBinding {
    buffer: GPUBuffer;
    offset?: GPUSize64;
    size?: GPUSize64;
  }
  var GPUPipelineLayout: {
    readonly prototype: GPUPipelineLayout;
    new (): never;
  };
  interface GPUPipelineLayout extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUPipelineLayout";
  }
  interface GPUPipelineLayoutDescriptor extends GPUObjectDescriptorBase {
    bindGroupLayouts: Iterable<GPUBindGroupLayout>;
  }
  type GPUCompilationMessageType = "error" | "warning" | "info";
  var GPUCompilationMessage: {
    readonly prototype: GPUCompilationMessage;
    new (): never;
  };
  interface GPUCompilationMessage {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUCompilationMessage";
    readonly message: string;
    readonly type: GPUCompilationMessageType;
    readonly lineNum: number;
    readonly linePos: number;
  }
  var GPUCompilationInfo: {
    readonly prototype: GPUCompilationInfo;
    new (): never;
  };
  interface GPUCompilationInfo {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUCompilationInfo";
    readonly messages: ReadonlyArray<GPUCompilationMessage>;
  }
  var GPUShaderModule: { readonly prototype: GPUShaderModule; new (): never };
  interface GPUShaderModule extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUShaderModule";
    compilationInfo(): Promise<GPUCompilationInfo>;
  }
  type GPUShaderModuleDescriptor =
    | GPUShaderModuleDescriptorWGSL
    | GPUShaderModuleDescriptorSPIRV;
  interface GPUShaderModuleDescriptorWGSL extends GPUObjectDescriptorBase {
    code: string;
    sourceMap?: object;
  }
  /** @deprecated */
  interface GPUShaderModuleDescriptorSPIRV extends GPUObjectDescriptorBase {
    /** @deprecated */
    code: Uint32Array;
  }
  interface GPUPipelineDescriptorBase extends GPUObjectDescriptorBase {
    layout?: GPUPipelineLayout;
  }
  interface GPUPipelineBase {
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }
  /** @deprecated */
  type GPUProgrammableStageDescriptor = GPUProgrammableStage;
  interface GPUProgrammableStage {
    module: GPUShaderModule;
    entryPoint: string;
  }
  var GPUComputePipeline: {
    readonly prototype: GPUComputePipeline;
    new (): never;
  };
  interface GPUComputePipeline extends GPUObjectBase, GPUPipelineBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUComputePipeline";
  }
  type GPUComputePipelineDescriptor =
    | GPUComputePipelineDescriptorNew
    | GPUComputePipelineDescriptorOld;
  interface GPUComputePipelineDescriptorNew extends GPUPipelineDescriptorBase {
    compute: GPUProgrammableStage;
  }
  /** @deprecated */
  interface GPUComputePipelineDescriptorOld extends GPUPipelineDescriptorBase {
    /** @deprecated */
    computeStage: GPUProgrammableStage;
  }
  var GPURenderPipeline: {
    readonly prototype: GPURenderPipeline;
    new (): never;
  };
  interface GPURenderPipeline extends GPUObjectBase, GPUPipelineBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPURenderPipeline";
  }
  type GPURenderPipelineDescriptor =
    | GPURenderPipelineDescriptorNew
    | GPURenderPipelineDescriptorOld;
  interface GPURenderPipelineDescriptorNew extends GPUPipelineDescriptorBase {
    vertex: GPUVertexState;
    primitive?: GPUPrimitiveState;
    depthStencil?: GPUDepthStencilState;
    multisample?: GPUMultisampleState;
    fragment?: GPUFragmentState;
  }
  type GPUPrimitiveTopology =
    | "point-list"
    | "line-list"
    | "line-strip"
    | "triangle-list"
    | "triangle-strip";
  interface GPUPrimitiveState {
    topology?: GPUPrimitiveTopology;
    stripIndexFormat?: GPUIndexFormat;
    frontFace?: GPUFrontFace;
    cullMode?: GPUCullMode;
  }
  type GPUFrontFace = "ccw" | "cw";
  type GPUCullMode = "none" | "front" | "back";
  interface GPUMultisampleState {
    count?: GPUSize32;
    mask?: GPUSampleMask;
    alphaToCoverageEnabled?: boolean;
  }
  interface GPUFragmentState extends GPUProgrammableStage {
    targets: Iterable<GPUColorTargetState>;
  }
  interface GPUColorTargetState {
    format: GPUTextureFormat;
    blend?: GPUBlendState;
    writeMask?: GPUColorWriteFlags;
  }
  interface GPUBlendState {
    color: GPUBlendComponent;
    alpha: GPUBlendComponent;
  }
  type GPUColorWriteFlags = number;
  var GPUColorWrite: {
    readonly RED: GPUFlagsConstant;
    readonly GREEN: GPUFlagsConstant;
    readonly BLUE: GPUFlagsConstant;
    readonly ALPHA: GPUFlagsConstant;
    readonly ALL: GPUFlagsConstant;
  };
  interface GPUBlendComponent {
    srcFactor?: GPUBlendFactor;
    dstFactor?: GPUBlendFactor;
    operation?: GPUBlendOperation;
  }
  type GPUBlendFactor =
    | "zero"
    | "one"
    | "src-color"
    | "one-minus-src-color"
    | "src-alpha"
    | "one-minus-src-alpha"
    | "dst-color"
    | "one-minus-dst-color"
    | "dst-alpha"
    | "one-minus-dst-alpha"
    | "src-alpha-saturated"
    | "blend-color"
    | "one-minus-blend-color";
  type GPUBlendOperation =
    | "add"
    | "subtract"
    | "reverse-subtract"
    | "min"
    | "max";
  interface GPUDepthStencilState {
    format: GPUTextureFormat;
    depthWriteEnabled?: boolean;
    depthCompare?: GPUCompareFunction;
    stencilFront?: GPUStencilFaceState;
    stencilBack?: GPUStencilFaceState;
    stencilReadMask?: GPUStencilValue;
    stencilWriteMask?: GPUStencilValue;
    depthBias?: GPUDepthBias;
    depthBiasSlopeScale?: number;
    depthBiasClamp?: number;
    clampDepth?: boolean;
  }
  interface GPUStencilFaceState {
    compare?: GPUCompareFunction;
    depthFailOp?: GPUStencilOperation;
    passOp?: GPUStencilOperation;
    failOp?: GPUStencilOperation;
  }
  type GPUStencilOperation =
    | "keep"
    | "zero"
    | "replace"
    | "invert"
    | "increment-clamp"
    | "decrement-clamp"
    | "increment-wrap"
    | "decrement-wrap";
  type GPUIndexFormat = "uint16" | "uint32";
  type GPUVertexFormat =
    | "uint8x2"
    | "uint8x4"
    | "sint8x2"
    | "sint8x4"
    | "unorm8x2"
    | "unorm8x4"
    | "snorm8x2"
    | "snorm8x4"
    | "uint16x2"
    | "uint16x4"
    | "sint16x2"
    | "sint16x4"
    | "unorm16x2"
    | "unorm16x4"
    | "snorm16x2"
    | "snorm16x4"
    | "float16x2"
    | "float16x4"
    | "float32"
    | "float32x2"
    | "float32x3"
    | "float32x4"
    | "uint32"
    | "uint32x2"
    | "uint32x3"
    | "uint32x4"
    | "sint32"
    | "sint32x2"
    | "sint32x3"
    | "sint32x4";
  type GPUInputStepMode = "vertex" | "instance";
  interface GPUVertexState extends GPUProgrammableStage {
    buffers?: Iterable<GPUVertexBufferLayout>;
  }
  /** @deprecated */
  type GPUVertexBufferLayoutDescriptor = GPUVertexBufferLayout;
  interface GPUVertexBufferLayout {
    arrayStride: GPUSize64;
    stepMode?: GPUInputStepMode;
    attributes: Iterable<GPUVertexAttribute>;
  }
  /** @deprecated */
  type GPUVertexAttributeDescriptor = GPUVertexAttribute;
  interface GPUVertexAttribute {
    format: GPUVertexFormat;
    offset: GPUSize64;
    shaderLocation: GPUIndex32;
  }
  var GPUCommandBuffer: { readonly prototype: GPUCommandBuffer; new (): never };
  interface GPUCommandBuffer extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUCommandBuffer";
    readonly executionTime: Promise<number>;
  }
  type GPUCommandBufferDescriptor = GPUObjectDescriptorBase;
  var GPUCommandEncoder: {
    readonly prototype: GPUCommandEncoder;
    new (): never;
  };
  interface GPUCommandEncoder extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUCommandEncoder";
    beginComputePass(
      descriptor?: GPUComputePassDescriptor
    ): GPUComputePassEncoder;
    beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
    copyBufferToBuffer(
      source: GPUBuffer,
      sourceOffset: GPUSize64,
      destination: GPUBuffer,
      destinationOffset: GPUSize64,
      size: GPUSize64
    ): undefined;
    copyBufferToTexture(
      source: GPUImageCopyBuffer,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
    copyTextureToBuffer(
      source: GPUImageCopyTexture,
      destination: GPUImageCopyBuffer,
      copySize: GPUExtent3DStrict
    ): undefined;
    copyTextureToTexture(
      source: GPUImageCopyTexture,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    popDebugGroup(): undefined;
    insertDebugMarker(markerLabel: string): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: GPUSize32): undefined;
    resolveQuerySet(
      querySet: GPUQuerySet,
      firstQuery: GPUSize32,
      queryCount: GPUSize32,
      destination: GPUBuffer,
      destinationOffset: GPUSize64
    ): undefined;
    finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
  }
  interface GPUCommandEncoderDescriptor extends GPUObjectDescriptorBase {
    measureExecutionTime?: boolean;
  }
  /** @deprecated */
  type GPUTextureDataLayout = GPUImageDataLayout;
  interface GPUImageDataLayout {
    offset?: GPUSize64;
    bytesPerRow?: GPUSize32;
    rowsPerImage?: GPUSize32;
  }
  /** @deprecated */
  type GPUBufferCopyView = GPUImageCopyBuffer;
  interface GPUImageCopyBuffer extends GPUImageDataLayout {
    buffer: GPUBuffer;
  }
  /** @deprecated */
  type GPUTextureCopyView = GPUImageCopyTexture;
  interface GPUImageCopyTexture {
    texture: GPUTexture;
    mipLevel?: GPUIntegerCoordinate;
    origin?: GPUOrigin3D;
    aspect?: GPUTextureAspect;
  }
  interface GPUImageBitmapCopyView {
    imageBitmap: ImageBitmap;
    origin?: GPUOrigin2D;
  }
  interface GPUProgrammablePassEncoder {
    setBindGroup(
      index: GPUIndex32,
      bindGroup: GPUBindGroup,
      dynamicOffsets?: Iterable<GPUBufferDynamicOffset>
    ): undefined;
    setBindGroup(
      index: GPUIndex32,
      bindGroup: GPUBindGroup,
      dynamicOffsetsData: Uint32Array,
      dynamicOffsetsDataStart: GPUSize64,
      dynamicOffsetsDataLength: GPUSize32
    ): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    popDebugGroup(): undefined;
    insertDebugMarker(markerLabel: string): undefined;
  }
  var GPUComputePassEncoder: {
    readonly prototype: GPUComputePassEncoder;
    new (): never;
  };
  interface GPUComputePassEncoder
    extends GPUObjectBase,
      GPUProgrammablePassEncoder {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUComputePassEncoder";
    setPipeline(pipeline: GPUComputePipeline): undefined;
    dispatch(x: GPUSize32, y?: GPUSize32, z?: GPUSize32): undefined;
    dispatchIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: GPUSize64
    ): undefined;
    beginPipelineStatisticsQuery(
      querySet: GPUQuerySet,
      queryIndex: GPUSize32
    ): undefined;
    endPipelineStatisticsQuery(): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: GPUSize32): undefined;
    endPass(): undefined;
  }
  type GPUComputePassDescriptor = GPUObjectDescriptorBase;
  interface GPURenderEncoderBase {
    setPipeline(pipeline: GPURenderPipeline): undefined;
    setIndexBuffer(
      buffer: GPUBuffer,
      indexFormat: GPUIndexFormat,
      offset?: GPUSize64,
      size?: GPUSize64
    ): undefined;
    setVertexBuffer(
      slot: GPUIndex32,
      buffer: GPUBuffer,
      offset?: GPUSize64,
      size?: GPUSize64
    ): undefined;
    draw(
      vertexCount: GPUSize32,
      instanceCount?: GPUSize32,
      firstVertex?: GPUSize32,
      firstInstance?: GPUSize32
    ): undefined;
    drawIndexed(
      indexCount: GPUSize32,
      instanceCount?: GPUSize32,
      firstIndex?: GPUSize32,
      baseVertex?: GPUSignedOffset32,
      firstInstance?: GPUSize32
    ): undefined;
    drawIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: GPUSize64
    ): undefined;
    drawIndexedIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: GPUSize64
    ): undefined;
  }
  var GPURenderPassEncoder: {
    readonly prototype: GPURenderPassEncoder;
    new (): never;
  };
  interface GPURenderPassEncoder
    extends GPUObjectBase,
      GPUProgrammablePassEncoder,
      GPURenderEncoderBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPURenderPassEncoder";
    setViewport(
      x: number,
      y: number,
      width: number,
      height: number,
      minDepth: number,
      maxDepth: number
    ): undefined;
    setScissorRect(
      x: GPUIntegerCoordinate,
      y: GPUIntegerCoordinate,
      width: GPUIntegerCoordinate,
      height: GPUIntegerCoordinate
    ): undefined;
    setBlendColor(color: GPUColor): undefined;
    setStencilReference(reference: GPUStencilValue): undefined;
    beginOcclusionQuery(queryIndex: GPUSize32): undefined;
    endOcclusionQuery(): undefined;
    beginPipelineStatisticsQuery(
      querySet: GPUQuerySet,
      queryIndex: GPUSize32
    ): undefined;
    endPipelineStatisticsQuery(): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: GPUSize32): undefined;
    executeBundles(bundles: Iterable<GPURenderBundle>): undefined;
    endPass(): undefined;
  }
  interface GPURenderPassDescriptor extends GPUObjectDescriptorBase {
    colorAttachments: Iterable<GPURenderPassColorAttachment>;
    depthStencilAttachment?: GPURenderPassDepthStencilAttachment;
    occlusionQuerySet?: GPUQuerySet;
  }
  type GPURenderPassColorAttachment =
    | GPURenderPassColorAttachmentNew
    | GPURenderPassColorAttachmentOld;
  interface GPURenderPassColorAttachmentNew {
    view: GPUTextureView;
    resolveTarget?: GPUTextureView;
    loadValue: GPULoadOp | GPUColor;
    storeOp?: GPUStoreOp;
  }
  /** @deprecated */
  interface GPURenderPassColorAttachmentOld {
    /** @deprecated */
    attachment: GPUTextureView;
    resolveTarget?: GPUTextureView;
    loadValue: GPULoadOp | GPUColor;
    storeOp?: GPUStoreOp;
  }
  type GPURenderPassDepthStencilAttachment =
    | GPURenderPassDepthStencilAttachmentNew
    | GPURenderPassDepthStencilAttachmentOld;
  interface GPURenderPassDepthStencilAttachmentNew {
    view: GPUTextureView;
    depthLoadValue: GPULoadOp | number;
    depthStoreOp: GPUStoreOp;
    depthReadOnly?: boolean;
    stencilLoadValue: GPULoadOp | GPUStencilValue;
    stencilStoreOp: GPUStoreOp;
    stencilReadOnly?: boolean;
  }
  /** @deprecated */
  interface GPURenderPassDepthStencilAttachmentOld {
    /** @deprecated */
    attachment: GPUTextureView;
    depthLoadValue: GPULoadOp | number;
    depthStoreOp: GPUStoreOp;
    depthReadOnly?: boolean;
    stencilLoadValue: GPULoadOp | GPUStencilValue;
    stencilStoreOp: GPUStoreOp;
    stencilReadOnly?: boolean;
  }
  type GPULoadOp = "load";
  type GPUStoreOp = "store" | "clear";
  var GPURenderBundle: { readonly prototype: GPURenderBundle; new (): never };
  interface GPURenderBundle extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPURenderBundle";
  }
  type GPURenderBundleDescriptor = GPUObjectDescriptorBase;
  var GPURenderBundleEncoder: {
    readonly prototype: GPURenderBundleEncoder;
    new (): never;
  };
  interface GPURenderBundleEncoder
    extends GPUObjectBase,
      GPUProgrammablePassEncoder,
      GPURenderEncoderBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPURenderBundleEncoder";
    finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
  }
  interface GPURenderBundleEncoderDescriptor extends GPUObjectDescriptorBase {
    colorFormats: Iterable<GPUTextureFormat>;
    depthStencilFormat?: GPUTextureFormat;
    sampleCount?: GPUSize32;
  }
  var GPUQueue: { readonly prototype: GPUQueue; new (): never };
  interface GPUQueue extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUQueue";
    submit(commandBuffers: Iterable<GPUCommandBuffer>): undefined;
    onSubmittedWorkDone(): Promise<undefined>;
    /** @deprecated */
    signal(fence: GPUFence, signalValue: number): undefined;
    /** @deprecated */
    createFence(descriptor?: GPUFenceDescriptor): GPUFence;
    writeBuffer(
      buffer: GPUBuffer,
      bufferOffset: GPUSize64,
      data: BufferSource | SharedArrayBuffer,
      dataOffset?: GPUSize64,
      size?: GPUSize64
    ): undefined;
    writeTexture(
      destination: GPUImageCopyTexture,
      data: BufferSource | SharedArrayBuffer,
      dataLayout: GPUTextureDataLayout,
      size: GPUExtent3DStrict
    ): undefined;
    copyImageBitmapToTexture(
      source: GPUImageBitmapCopyView,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
  }
  var GPUQuerySet: { readonly prototype: GPUQuerySet; new (): never };
  interface GPUQuerySet extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUQuerySet";
    destroy(): undefined;
  }
  interface GPUQuerySetDescriptor extends GPUObjectDescriptorBase {
    type: GPUQueryType;
    count: GPUSize32;
    pipelineStatistics?: Iterable<GPUPipelineStatisticName>;
  }
  type GPUQueryType = "occlusion" | "pipeline-statistics" | "timestamp";
  type GPUPipelineStatisticName =
    | "vertex-shader-invocations"
    | "clipper-invocations"
    | "clipper-primitives-out"
    | "fragment-shader-invocations"
    | "compute-shader-invocations";
  var GPUCanvasContext: { readonly prototype: GPUCanvasContext; new (): never };
  interface GPUCanvasContext {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUCanvasContext";
    configureSwapChain(descriptor: GPUSwapChainDescriptor): GPUSwapChain;
    getSwapChainPreferredFormat(adapter: GPUAdapter): GPUTextureFormat;
    /** @deprecated */
    getSwapChainPreferredFormat(device: GPUDevice): Promise<GPUTextureFormat>;
  }
  interface GPUSwapChainDescriptor extends GPUObjectDescriptorBase {
    device: GPUDevice;
    format: GPUTextureFormat;
    usage?: GPUTextureUsageFlags;
  }
  var GPUSwapChain: { readonly prototype: GPUSwapChain; new (): never };
  interface GPUSwapChain extends GPUObjectBase {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUSwapChain";
    getCurrentTexture(): GPUTexture;
  }
  type GPUDeviceLostReason = "destroyed";
  var GPUDeviceLostInfo: {
    readonly prototype: GPUDeviceLostInfo;
    new (): never;
  };
  interface GPUDeviceLostInfo {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUDeviceLostInfo";
    readonly reason: GPUDeviceLostReason | undefined;
    readonly message: string;
  }
  type GPUErrorFilter = "out-of-memory" | "validation";
  var GPUOutOfMemoryError: {
    readonly prototype: GPUOutOfMemoryError;
    new (): GPUOutOfMemoryError;
  };
  interface GPUOutOfMemoryError {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUOutOfMemoryError";
  }
  var GPUValidationError: {
    readonly prototype: GPUValidationError;
    new (message: string): GPUValidationError;
  };
  interface GPUValidationError {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUValidationError";
    readonly message: string;
  }
  type GPUError = GPUOutOfMemoryError | GPUValidationError;
  var GPUUncapturedErrorEvent: {
    readonly prototype: GPUUncapturedErrorEvent;
    new (
      type: string,
      gpuUncapturedErrorEventInitDict: GPUUncapturedErrorEventInit
    ): GPUUncapturedErrorEvent;
  };
  interface GPUUncapturedErrorEvent extends Event {
    /**
     * Nominal type branding.
     * https://github.com/microsoft/TypeScript/pull/33038
     * @internal
     */
    readonly __brand: "GPUUncapturedErrorEvent";
    readonly error: GPUError;
  }
  interface GPUUncapturedErrorEventInit extends EventInit {
    error: GPUError;
  }
  type GPUBufferDynamicOffset = number;
  type GPUStencilValue = number;
  type GPUSampleMask = number;
  type GPUDepthBias = number;
  type GPUSize64 = number;
  type GPUIntegerCoordinate = number;
  type GPUIndex32 = number;
  type GPUSize32 = number;
  type GPUSignedOffset32 = number;
  type GPUFlagsConstant = number;
  interface GPUColorDict {
    r: number;
    g: number;
    b: number;
    a: number;
  }
  type GPUColor = [number, number, number, number] | GPUColorDict;
  interface GPUOrigin2DDict {
    x?: GPUIntegerCoordinate;
    y?: GPUIntegerCoordinate;
  }
  type GPUOrigin2D = [number, number] | GPUOrigin2DDict;
  interface GPUOrigin3DDict {
    x?: GPUIntegerCoordinate;
    y?: GPUIntegerCoordinate;
    z?: GPUIntegerCoordinate;
  }
  type GPUOrigin3D = GPUIntegerCoordinate[] | GPUOrigin3DDict;
  interface GPUExtent3DDict {
    width: GPUIntegerCoordinate;
    height?: GPUIntegerCoordinate;
    depthOrArrayLayers?: GPUIntegerCoordinate;
  }
  type GPUExtent3D = GPUIntegerCoordinate[] | GPUExtent3DDict;
  interface GPUExtent3DDictStrict extends GPUExtent3DDict {
    /** @deprecated */
    depth?: undefined;
  }
  type GPUExtent3DStrict = GPUIntegerCoordinate[] | GPUExtent3DDictStrict;

  // *********************************************************************************************
  // Deprecated
  // *********************************************************************************************

  /** @deprecated */
  type GPURenderPassColorAttachmentDescriptor = GPURenderPassColorAttachment;
  /** @deprecated */
  type GPURenderPassDepthStencilAttachmentDescriptor = GPURenderPassDepthStencilAttachment;

  /** @deprecated use GPURenderPipelineDescriptor instead */
  interface GPURenderPipelineDescriptorOld extends GPUPipelineDescriptorBase {
    /** @deprecated */
    vertexStage?: GPUProgrammableStageDescriptor;
    /** @deprecated */
    fragmentStage?: GPUProgrammableStageDescriptor;
    /** @deprecated */
    primitiveTopology?: GPUPrimitiveTopology;
    /** @deprecated */
    rasterizationState?: GPURasterizationStateDescriptor;
    /** @deprecated */
    colorStates?: Iterable<GPUColorStateDescriptor>;
    /** @deprecated */
    depthStencilState?: GPUDepthStencilStateDescriptor;
    /** @deprecated */
    vertexState?: GPUVertexStateDescriptor;
    /** @deprecated */
    sampleCount?: number;
    /** @deprecated */
    sampleMask?: number;
    /** @deprecated */
    alphaToCoverageEnabled?: boolean;
  }

  /** @deprecated */
  type GPUBindingType =
    | "uniform-buffer"
    | "storage-buffer"
    | "readonly-storage-buffer"
    | "sampler"
    | "comparison-sampler"
    | "sampled-texture"
    | "multisampled-texture"
    | "readonly-storage-texture"
    | "writeonly-storage-texture";
  /** @deprecated */
  type GPUTextureComponentType = "float" | "sint" | "uint" | "depth-comparison";
  /** @deprecated */
  type GPUBlendDescriptor = GPUBlendComponent;
  /** @deprecated */
  interface GPUColorStateDescriptor {
    format: GPUTextureFormat;
    alphaBlend?: GPUBlendDescriptor;
    colorBlend?: GPUBlendDescriptor;
    writeMask?: GPUColorWriteFlags;
  }
  /** @deprecated */
  interface GPUDepthStencilStateDescriptor {
    format: GPUTextureFormat;
    depthWriteEnabled?: boolean;
    depthCompare?: GPUCompareFunction;
    stencilFront?: GPUStencilStateFaceDescriptor;
    stencilBack?: GPUStencilStateFaceDescriptor;
    stencilReadMask?: number;
    stencilWriteMask?: number;
  }
  /** @deprecated */
  interface GPUFenceDescriptor extends GPUObjectDescriptorBase {
    initialValue?: number;
    signalQueue?: GPUQueue;
  }
  /** @deprecated */
  interface GPUVertexStateDescriptor {
    indexFormat?: GPUIndexFormat;
    vertexBuffers?: Iterable<GPUVertexBufferLayoutDescriptor>;
  }
  /** @deprecated */
  interface GPURasterizationStateDescriptor {
    frontFace?: GPUFrontFace;
    cullMode?: GPUCullMode;
    clampDepth?: boolean;
    depthBias?: number;
    depthBiasSlopeScale?: number;
    depthBiasClamp?: number;
  }
  /** @deprecated */
  type GPUStencilStateFaceDescriptor = GPUStencilFaceState;
  /** @deprecated */
  var GPUFence: { readonly prototype: GPUFence; new (): never };
  /** @deprecated */
  interface GPUFence extends GPUObjectBase {
    getCompletedValue(): number;
    onCompletion(completionValue: number): Promise<undefined>;
  }
}
export {};
