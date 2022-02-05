import { VNode } from 'snabbdom';
import { IssueMarkerView, RenderingContext, SIssueMarker, SIssueSeverity } from 'sprotty';
export declare class GIssueMarkerView extends IssueMarkerView {
    render(marker: SIssueMarker, _context: RenderingContext): VNode;
    protected getGlspIssueMarkerBackground(severity: SIssueSeverity): VNode;
    protected get radius(): number;
    protected getGlspIssueMarkerPath(severity: SIssueSeverity): string;
}
//# sourceMappingURL=issue-marker-view.d.ts.map