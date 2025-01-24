import fs from 'fs'
import { extractErorMessage } from './libs/error';
import { parseDockerCompose } from './libs/docker-compose';

/**
 * Hotfix function to fix path
 * 
 * e.g. `../src/clients/` => `./src/clients/`
 * @param path 
 * @returns 
 */
function levelUpPath(path: string): string {
  return './' + path.replace(/^\.\.\//, '')
}

const PROJECT_NAME = 'govbkk';

interface DeployConfig {
  branch: string;
  repository: string;
  imageTag: string;
  services: string[];
  dockerComposeFile: string;
}
async function main({
  branch,
  repository,
  imageTag,
  services,
  dockerComposeFile,
}: DeployConfig) {

  const file = fs.readFileSync(dockerComposeFile, 'utf8')
  const dockerCompose = parseDockerCompose(file);

  for (const serviceName of services) {
    const service = dockerCompose.services[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found in docker-compose file`);
    }

    const image = `${PROJECT_NAME}/${serviceName}`;
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
}

main({

}).catch(
  (error) => {
    console.error(extractErorMessage(error));
    process.exit(1);
  }
)