import { SIssueMarker, SParentElement } from 'sprotty';
export declare namespace MarkerPredicates {
    const ALL: () => boolean;
    const ERRORS: (marker: SIssueMarker) => boolean;
    const WARNINGS: (marker: SIssueMarker) => boolean;
    const INFOS: (marker: SIssueMarker) => boolean;
    function hasIssueWithSeverity(marker: SIssueMarker, severity: 'info' | 'warning' | 'error'): boolean;
}
export declare function collectIssueMarkers(root: SParentElement): SIssueMarker[];
//# sourceMappingURL=marker.d.ts.map