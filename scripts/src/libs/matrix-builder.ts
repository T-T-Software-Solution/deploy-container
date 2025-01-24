import { parseDockerCompose, type DockerCompose } from "./docker-compose";
import type { DeploymentMatrix } from "./types";
import fs from 'fs';

export interface MatrixBuilderOptions {
  scope: string;
  branch: string;
  repository: string;
  imageTag: string;
  services: string[];
  dockerComposeFile: string;
}

export class MatrixBuilder {

  dockerCompose: DockerCompose | undefined;

  constructor(private options: MatrixBuilderOptions) { }

  async init() {
    const file = await fs.promises.readFile(this.options.dockerComposeFile, 'utf8')
    this.dockerCompose = parseDockerCompose(file);
  }

  build(): DeploymentMatrix {
    const { branch, repository, imageTag, services } = this.options;
    if (!this.dockerCompose) {
      throw new Error('Docker Compose file not loaded, call init() first');
    }
    const matrix = {
      docker_image: []
    }

    for (const serviceName of services) {
      const service = this.dockerCompose.services[serviceName];
      if (!service) {
        throw new Error(`Service ${serviceName} not found in docker-compose file`);
      }

      const image = `${this.options.scope}/${serviceName}`;
      const workingDir = typeof service.build === 'string' ? service.build : service.build?.context;
      const dockerfile = typeof service.build === 'string' ? undefined : service.build?.dockerfile;
      const buildArgs = typeof service.build === 'string' ? undefined : service.build?.args;

      // await deploy(octokit, {
      //   repository,
      //   branch,
      //   image_name: image,
      //   image_tag: imageTag,
      //   working_dir: workingDir ? levelUpPath(workingDir) : '.',
      //   dockerfile: dockerfile ?? 'Dockerfile',
      //   build_args: {
      //     ...buildArgs ?? {},
      //   }
      // });
    }

    return matrix;
  }
}