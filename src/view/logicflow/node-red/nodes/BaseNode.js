import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { getBytesLength } from "../util";

class RedNodeModel extends RectNodeModel {
  /**
   * 初始化
   */
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 30;
    this.radius = 5;
    // this.text.editable = false;
    this.text.x = this.x + 10;
    this.iconPosition = ""; // icon位置，left表示左边，'right'表示右边
    this.defaultFill = "#a6bbcf";
    // console.log(this, "===this===");
    // 校验能不能连线
    const circleOnlyAsTarget = {
      message: "正方形节点下一个节点只能是圆形节点",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        console.log(sourceNode, targetNode, "sourceNode, targetNode");
        console.log(super.incoming, super.outgoing, "===getAnchorInfo");
        return (
          targetNode.type === "fetch-node" && super.outgoing?.edges.length === 0
        );
      },
    };
    // 定义连接规则，只允许出口节点连接入口节点
    const rule = {
      message: "只允许出口节点连接入口节点",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        console.log(sourceAnchor, targetAnchor, "---===--");
        return true;
      },
    };
    // this.sourceRules.push(circleOnlyAsTarget);
    this.sourceRules.push(rule);
  }
  getData() {
    const data = super.getData();
    data.properties.ui = "node-red";
    return data;
  }
  /**
   * 动态设置初始化数据
   */
  setAttributes() {
    if (this.properties.sameType && this.incoming.edges.length === 0) {
      this.isShowAnchor = true;
    } else {
      this.isShowAnchor = false;
    }
    if (this.text.value) {
      let width = 30 + getBytesLength(this.text.value) * 9;
      width = Math.ceil(width / 20) * 20;
      if (width < 100) {
        width = 100;
      }
      this.width = width;
    }
  }
  updateText(val) {
    super.updateText(val);
    this.setAttributes();
  }
  /**
   * 重写节点样式
   */
  getNodeStyle() {
    const style = super.getNodeStyle();
    const dataStyle = this.properties.style || {};
    if (this.isSelected) {
      style.strokeWidth = Number(dataStyle.borderWidth) || 2;
      style.stroke = dataStyle.borderColor || "#ff7f0e";
    } else {
      style.strokeWidth = Number(dataStyle.borderWidth) || 1;
      style.stroke = dataStyle.borderColor || "#999";
    }
    style.fill = dataStyle.backgroundColor || this.defaultFill;
    return style;
  }
  /**
   * 重写定义锚点
   */
  getDefaultAnchor() {
    const { x, y, id, width, height } = this;
    const anchors = [
      {
        x: x,
        y: y + height / 2,
        id: `${id}_bottom`,
        type: "bottom",
      },
      {
        x: x,
        y: y - height / 2,
        id: `${id}_top`,
        type: "top",
      },
    ];
    return anchors;
  }

  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo);
    const { x, y, type } = anchorInfo;
    console.log(anchorInfo, "anchorInfo");
    if (type === "top") {
      style.fill = "#ffaabb";
      style.stroke = "#ffaabb";
    } else {
      style.fill = "rgb(90, 181, 215)";
      style.stroke = "rgb(90, 181, 215)";
    }
    style.r = 3;

    style.hover.r = 5;
    style.hover.fill = "#ffaabb";
    style.hover.stroke = "#ffaabb";
    return style;
  }
  /**
   *
   */
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = "transparent";
    style.hover.stroke = "transparent";
    return style;
  }
}
class RedNode extends RectNode {
  /**
   * 1.1.7版本后支持在view中重写锚点形状。
   * 重写锚点新增
   */
  // getAnchorShape(anchorData) {
  //   console.log(anchorData, "anchorData", this);
  //   const { x, y, type } = anchorData;
  //   return h("rect", {
  //     x: x - 5,
  //     y: y - 5,
  //     width: 10,
  //     height: 10,
  //     className: "custom-anchor",
  //   });
  // }
  getIcon() {
    return null;
  }
  getShape() {
    const { text, x, y, width, height, radius } = this.props.model;
    const style = this.props.model.getNodeStyle();
    return h(
      "g",
      {
        className: "lf-red-node",
      },
      [
        h("rect", {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          rx: radius,
          ry: radius,
        }),
        h(
          "g",
          {
            style: "pointer-events: none;",
            transform: `translate(${x}, ${y})`,
          },
          [
            h("rect", {
              x: -width / 2,
              y: -height / 2,
              width: 30,
              height: 30,
              fill: "#000",
              fillOpacity: 0.05,
              stroke: "none",
            }),
            this.getIcon(),
            h("path", {
              d: `M ${30 - width / 2} ${1 - height / 2} l 0 28`,
              stroke: "#000",
              strokeOpacity: 0.1,
              strokeWidth: 1,
            }),
          ]
        ),
      ]
    );
  }
}

export default {
  type: "red-node",
  model: RedNodeModel,
  view: RedNode,
};
