## REMOVED Requirements

### Requirement: Hero drone video
**Reason**: The owner dropped the hero video.
**Migration**: The hero shows `heroDesktop` and `heroMobile`; see `hero-photo`.

### Requirement: Poster first and LCP
**Reason**: There's no video to wait for.
**Migration**: Replaced by "Hero loading" in `hero-photo`.

### Requirement: Reduced motion
**Reason**: Without a video, there's nothing to suppress.
**Migration**: Text animations are covered by "Hero loading" in `hero-photo`.
