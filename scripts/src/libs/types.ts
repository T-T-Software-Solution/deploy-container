
export interface BuildDockerMatrix {
  /**
   * Repository
   */
  repository: string;
  /**
   * Branch
   */
  branch: string;
  /**
   * Image Name
   */
  image_name: string;
  /**
   * Image Tag
   */
  image_tag: string;
  /**
   * Working Directory
   */
  working_dir: string;
  /**
   * Build Arguments, JSON format, type: Record<string, string>
   */
  build_args: Record<string, string>;
  /**
   * Dockerfile
   */
  dockerfile: string;
}

export interface DeploymentMatrix {
  docker_image: BuildDockerMatrix[];
}
