import { RenovateConfig } from '../../../config';
import * as npmApi from '../../../datasource/npm';
import { RepoParams, RepoResult, platform } from '../../../platform';

// TODO: fix types
export type WorkerPlatformConfig = RepoResult &
  RenovateConfig &
  Record<string, any>;

// TODO: fix types
async function getPlatformConfig(
  config: RepoParams
): Promise<WorkerPlatformConfig> {
  const platformConfig = await platform.initRepo(config);
  return {
    ...config,
    ...platformConfig,
  };
}

// TODO: fix types
export async function initApis(
  input: RenovateConfig
): Promise<WorkerPlatformConfig> {
  let config: WorkerPlatformConfig = { ...input } as never;
  config = await getPlatformConfig(config as never);
  npmApi.resetMemCache();
  npmApi.setNpmrc(config.npmrc);
  return config;
}
