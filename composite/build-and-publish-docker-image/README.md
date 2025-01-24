# Github Actions: Build and Publish Docker Image

This composite action builds and publishes a Docker image to a container registry.

## Usage

```yaml
steps:
  - name: Checkout Build Composite
    uses: actions/checkout@v4
    with:
      path: composite-actions

  - name: Call Composite build and publish docker image
    uses: ./composite-actions/.github/workflows/composite/build-and-publish-docker-image
    with:
      secrets: ${{ toJson(secrets) }}
      gh_token: ${{ secrets.GH_TOKEN_ORG_LEVEL_READ_WRITE_THADA_TTSS }}
      container_registry_server: ${{ secrets.ACR_SERVER_NAME }}.azurecr.io
      container_registry_username: ${{ secrets.ACR_SERVER_NAME }}
      container_registry_password: ${{ secrets.CONTAINER_REGISTRY_PASSWORD }}
      repository: ${{ inputs.repository }}
      branch: ${{ inputs.branch }}
      image_name: ${{ inputs.image_name }}
      image_tag: ${{ inputs.image_tag }}
      working_dir: ${{ inputs.working_dir }}
      build_args: ${{ inputs.build_args }}
      dockerfile: ${{ inputs.dockerfile }}
```