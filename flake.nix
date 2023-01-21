{
  # main
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    corepack = {
      url = "github:SnO2WMaN/corepack-flake";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };
    devshell = {
      url = "github:numtide/devshell";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          overlays = with inputs; [
            devshell.overlay
            corepack.overlays.default
          ];
        };
      in {
        devShells.default = pkgs.devshell.mkShell {
          packages = with pkgs; [
            nodejs
            (mkCorepack {
              nodejs = nodejs;
              pm = "pnpm";
            })
          ];
          devshell.startup.pnpm_install.text = "pnpm install";
          env = [
            {
              name = "PATH";
              prefix = "$PRJ_ROOT/node_modules/.bin";
            }
          ];
        };
      }
    );
}
