# berry-ecosystem-check

**This is Work In Progress.**

This small package aims to check whether yarn v2 (i.e. berry) will work well the most popular packages of the ecosystem, mostly by identifying dependencies that were not declared (or not properly declared).

## How does this compare with the e2e tests in berry?

The end-to-end tests in berry are tailored to specific (and important) packages to ensure that they always work with yarn v2.
On the other hand `berry-ecosystem-check` performs superficial checks on arbitrary packages in order to sniff out obvious defects.

