import { z } from 'zod';
import { extractErorMessage } from './libs/error';

export const envSchema = z.object({
  /**
   * The scope of the image, e.g. `my-username` or `my-org`
   */
  SCOPE: z.string(),
  /**
   * The branch name
   */
  BRANCH: z.string(),
  /**
   * The repository name
   */
  REPOSITORY: z.string(),
  /**
   * The image tag
   */
  IMAGE_TAG: z.string(),
  /**
   * The services to build
   * 
   * Comma separated list of service names
   * 
   * e.g. `service1,service2`
   * Convert to: `['service1', 'service2']`
   */
  SERVICES: z.preprocess((val: unknown) => {
    if (val === '' || val === undefined || val === null) return [];
    return typeof val === 'string' ? val.trim().split(',') : [];
  }, z.array(z.string())),
  /**
   * The path to the docker-compose file
   * 
   * e.g. `docker-compose.yml`
   */
  DOCKER_COMPOSE_FILE: z.string(),
  /**
   * The working directory
   * 
   * e.g. .
   */
  WORKING_DIR: z.string(),
});

export function getEnv(env: Record<string, string | undefined>) {
  try {
    return envSchema.parse(env);
  } catch (error: unknown) {
    console.error(`Error parsing environment variables: ${extractErorMessage(error)}`);
    process.exit(1);
  }
}