
class BezierCurve {

    static getControlPoints(preVertex, beginVertex, endVertex, nextVertex) {
        let preBeginMidPoint = BezierCurve._getMidPoint(preVertex, beginVertex);
        let beiginEndMidPoint = BezierCurve._getMidPoint(beginVertex, endVertex);
    }

    static _getMidPoint(vertex1, vertex2) {
        let midPoint = {};
        midPoint.x = (vertex1.x + vertex2.x) / 2.0;
        midPoint.y = (vertex1.y + vertex2.y) / 2.0;
        return midPoint;
    }
}

const Utils = {
    BezierCurve: BezierCurve
};
export default Utils;