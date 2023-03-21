export const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
  <process id="serviceTask" name="yst-3" isExecutable="true">
    <startEvent id="startEvent1" name="开始" flowable:formFieldValidation="true"></startEvent>
    <serviceTask id="sid-64F48695-520B-4288-A751-97A038B5B35C" name="编辑中间过程" flowable:delegateExpression="">
      <extensionElements>
        <flowable:field name="helloword">
          <flowable:string><![CDATA[yst-serviceTsk]]></flowable:string>
        </flowable:field>
      </extensionElements>
    </serviceTask>
    <sequenceFlow id="sid-3915526B-011B-4534-B197-F815D359FBCB" sourceRef="startEvent1" targetRef="sid-64F48695-520B-4288-A751-97A038B5B35C"></sequenceFlow>
    <endEvent id="sid-FC7A3385-F48A-4765-AF40-640568A5C647" name="结束-end"></endEvent>
    <sequenceFlow id="sid-FD9B61D0-62FB-48B6-AD2E-AAE9925999C1" sourceRef="sid-64F48695-520B-4288-A751-97A038B5B35C" targetRef="sid-FC7A3385-F48A-4765-AF40-640568A5C647"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_serviceTask">
    <bpmndi:BPMNPlane bpmnElement="serviceTask" id="BPMNPlane_serviceTask">
      <bpmndi:BPMNShape bpmnElement="startEvent1" id="BPMNShape_startEvent1">
        <omgdc:Bounds height="30.0" width="30.0" x="105.0" y="195.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-64F48695-520B-4288-A751-97A038B5B35C" id="BPMNShape_sid-64F48695-520B-4288-A751-97A038B5B35C">
        <omgdc:Bounds height="80.0" width="100.0" x="330.0" y="165.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-FC7A3385-F48A-4765-AF40-640568A5C647" id="BPMNShape_sid-FC7A3385-F48A-4765-AF40-640568A5C647">
        <omgdc:Bounds height="28.0" width="28.0" x="475.0" y="191.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-FD9B61D0-62FB-48B6-AD2E-AAE9925999C1" id="BPMNEdge_sid-FD9B61D0-62FB-48B6-AD2E-AAE9925999C1">
        <omgdi:waypoint x="429.95000000000005" y="205.0"></omgdi:waypoint>
        <omgdi:waypoint x="475.0" y="205.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-3915526B-011B-4534-B197-F815D359FBCB" id="BPMNEdge_sid-3915526B-011B-4534-B197-F815D359FBCB">
        <omgdi:waypoint x="134.9472918001051" y="209.71159071648805"></omgdi:waypoint>
        <omgdi:waypoint x="329.99999999999994" y="205.96057692307693"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;
