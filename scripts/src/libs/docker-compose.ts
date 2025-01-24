import { z } from 'zod';
import YAML from 'yaml';

const PortMappingSchema = z.string().or(z.number());

const ServiceSchema = z.object({
  image: z.string().optional(),
  build: z
    .union([
      z.string(),
      z.object({
        context: z.string(),
        dockerfile: z.string().optional(),
        args: z.record(z.string()).optional(),
      }),
    ])
    .optional(),
  ports: z.array(z.union([z.string(), PortMappingSchema])).optional(),
  volumes: z.array(z.string()).optional(),
  // environment: z.record(z.string()).optional(),
  depends_on: z.array(z.string()).optional(),
  networks: z.array(z.string()).optional(),
  restart: z.enum(["no", "always", "on-failure", "unless-stopped"]).optional(),
  command: z.union([z.string(), z.array(z.string())]).optional(),
  entrypoint: z.union([z.string(), z.array(z.string())]).optional(),
  profiles: z.array(z.string()).optional(),
  env_file: z.array(z.string()).optional(),
});

const VolumeSchema = z.object({
  driver: z.string().optional(),
  driver_opts: z.record(z.string()).optional(),
  external: z.boolean().optional(),
});

const NetworkSchema = z.object({
  driver: z.string().optional(),
  driver_opts: z.record(z.string()).optional(),
  external: z.boolean().optional(),
});

export const DockerComposeSchema = z.object({
  version: z.string().optional(),
  services: z.record(ServiceSchema),
  // volumes: z.record(VolumeSchema).optional(),
  networks: z.record(NetworkSchema).optional(),
});

export const parseDockerCompose = (file: string): z.infer<typeof DockerComposeSchema> => {
  return DockerComposeSchema.parse(YAML.parse(file) as unknown);
}

export type DockerCompose = z.infer<typeof DockerComposeSchema>;