import { BridgeResult } from '@avatarconnect/sdk';

export interface AvatarMetadata {
  source: string;
  type: 'humanoid' | 'humanoid-male' | 'humanoid-female';
  fileFormat: string;
  reference?: string;
  bodyType?: 'full-body' | 'half-body';
  boneStructure?: {
    head?: string;
  };
}

export const mapBridgeResultToAvatarMetadata = async (
  bridgeResult: BridgeResult
): Promise<AvatarMetadata> => {
  const metadata: AvatarMetadata = {
    source: bridgeResult.provider,
    type: getType(bridgeResult),
    fileFormat: bridgeResult.avatar.format,
    bodyType: getBodyType(bridgeResult)
    //boneStructure: await getBoneStructure(bridgeResult)
    // TODO: additional fields to be populated in the future
  };

  return metadata;
};

const getBodyType = (bridgeResult: BridgeResult): 'full-body' | 'half-body' => {
  // eslint-disable-next-line
  const metadata = bridgeResult.metadata as any;

  if (bridgeResult.provider === 'ready-player-me' && metadata.bodyType) {
    return metadata.bodyType === 'halfBody' ? 'half-body' : 'full-body';
  }

  return 'full-body';
};

const getType = (bridgeResult: BridgeResult): 'humanoid' | 'humanoid-male' | 'humanoid-female' => {
  // eslint-disable-next-line
  const metadata = bridgeResult.metadata as any;

  if (bridgeResult.provider === 'ready-player-me' && metadata.gender) {
    return metadata.outfitGender === 'masculine' ? 'humanoid-male' : 'humanoid-female';
  }

  return 'humanoid';
};

// TODO: Add bonestructure mapping
/* const getBoneStructure = async (bridgeResult: BridgeResult) => {
  if (bridgeResult.avatar.format === 'vrm') {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(bridgeResult.avatar.uri);
    const headBone = 'head' as VRMSchema.HumanoidBoneName;
    const vrm = await VRM.from(gltf);
    const head = vrm?.humanoid?.getBoneNode(headBone);
    if (head && head.name) {
      console.log(head);
      return {
        head: head.name
      };
    }
  }
  return {
    head: 'hi'
  };
};*/
