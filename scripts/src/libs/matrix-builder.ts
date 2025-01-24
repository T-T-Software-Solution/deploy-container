import type { DeploymentMatrix } from "./types";

export class MatrixBuilder {

  build(): DeploymentMatrix {
    return {
      docker_image: []
    }
  }
}