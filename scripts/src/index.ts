import { MatrixBuilder } from './libs/matrix-builder';

async function main() {

  const matrix = new MatrixBuilder({
    branch: 'master',
    repository: 'octokit/core.js',
    imageTag: 'latest',
    services: ['service1', 'service2'],
    dockerComposeFile: 'docker-compose.yml',
    scope: 'dummy'
  }).build();

}

main();