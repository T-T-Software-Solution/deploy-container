import * as core from '@actions/core';
import { MatrixBuilder } from './libs/matrix-builder';
import { getEnv } from './env.schema';

async function main() {

  const env = getEnv(process.env);

  const matrix = await (new MatrixBuilder({
    branch: env.BRANCH,
    repository: env.REPOSITORY,
    imageTag: env.IMAGE_TAG,
    services: env.SERVICES,
    dockerComposeFile: env.DOCKER_COMPOSE_FILE,
    scope: env.SCOPE
  })).init();

  core.setOutput('matrix', JSON.stringify(matrix.build()));

}

main();