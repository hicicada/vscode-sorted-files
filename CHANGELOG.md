# Change Log

All notable changes to the "vscode-sorted-files" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.13] - 2026-01-20

- Added enable/disable configuration option for the sorted files feature
- Added `is_enabled()` function to check if the extension is enabled
- Modified extension activation/deactivation to respect the enabled setting
- Import `is_enabled` function in extension.ts

## [0.0.8] - 2026-01-20

- Fixed deactivate function to properly await async config updates
- Changed deactivate to async function for reliable cleanup on extension shutdown

## [0.0.7] - 2026-01-20

- Fixed default sort order behavior in configuration update
- Changed sort order reset to use 'default' value instead of undefined

## [0.0.6] - 2026-01-20

- Default enable on startup
- Remove sortOrder configuration

## [0.0.5] - 2026-01-20

- Added performance metrics to sorting completion message
- Display file count and execution time in output channel

## [0.0.4] - 2026-01-20

- Added `vscode-sorted-files.file` configuration option for customizing sort file location

## [0.0.3] - 2026-01-20

- Fixed gitignore pattern matching for proper ignore file support
- Improved relative path matching in file traversal

## [0.0.2] - 2026-01-20

- Improved launch configuration for extension testing

## [0.0.1] - 2026-01-20

- Initial release
