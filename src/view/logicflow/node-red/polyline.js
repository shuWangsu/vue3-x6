import { CurvedEdge, CurvedEdgeModel } from "@logicflow/extension";

class myCurvedEdge extends CurvedEdge {}
class myCurvedEdgeModel extends CurvedEdgeModel {
  initEdgeData(data) {
    super.initEdgeData(data);
    this.radius = 5;
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.strokeWidth = 2;
    style.stroke = this.isSelected ? "#ff7f0e" : "#999";
    return style;
  }
  //   setAttributes() {
  //     this.isAnimation = true;
  //   }
  //   getEdgeAnimationStyle() {
  //     const style = super.getEdgeAnimationStyle();
  //     style.strokeDasharray = "15 5";
  //     style.animationDuration = "10s";
  //     style.stroke = "rgb(130, 179, 102)";
  //     return style;
  //   }
}

export default {
  type: "flow-link",
  view: myCurvedEdge,
  model: myCurvedEdgeModel,
};
