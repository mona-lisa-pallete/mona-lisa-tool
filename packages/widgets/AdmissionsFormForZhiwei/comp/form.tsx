import React, { useState, useEffect, useRef } from "react";
import { Button, View, Image, Input } from "@tarojs/components";
import Modal from './modal';
import { useCallback } from "react";

enum EditType {
  GRADE = 'grade', // 年级
  SUBJECT = 'subject', // 科目
  CLASS = 'class', // 班级
  TIME = 'time', // 上课时间
  ADDRESS = 'address', // 地址
}

const titles = {
  [EditType.GRADE]: '选择年级',
  [EditType.SUBJECT]: '选择科目',
  [EditType.CLASS]: '选择班级',
  [EditType.TIME]: '选择上课时间',
  [EditType.ADDRESS]: '选择所在地区',
}

interface FormProps {
}

const FormComponent: React.FC<FormProps> = (props) => {
  const [editType, setEditType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, _setFormData] = useState({
    name: '',
    grade: '',
    subject: '',
    class: '',
    time: '',
    address: '',
  });
  const [modalContent, setModalContent] = useState(null);
  const isSelected = useCallback((defaultClass: string, selected: boolean) => selected ? `selected ${defaultClass}` : defaultClass, []);
  const setFormData = useCallback((key: string, value: any) => {
    formData[key] = value;
    _setFormData(formData);
  }, [formData]);
  const setGrade = useCallback((value: string) => {
    setFormData(EditType.GRADE, value);
    setEditType(EditType.CLASS);
  }, []);
  useEffect(() => {
    let _modalContent = null;
    switch (editType) {
      case EditType.GRADE:
        _modalContent = (
          <View className="grade-edit">
            <View className="grade-subtitle">小学阶段</View>
            <View className="grade-container">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <View
                  className={isSelected('grade-item', formData.grade === `小学阶段${index}`)}
                  key={index}
                  onClick={() => setGrade(`小学阶段${index}`)}>
                  <View className="grade-from">学前-{item}</View>
                  <View className="grade-to">升一年级</View>
                </View>
              ))}
            </View>
            <View className="grade-subtitle">中学阶段</View>
            <View className="grade-container">
              {[1, 2, 3].map((item, index) => (
                <View
                className={isSelected('grade-item', formData.grade === `中学阶段${index}`)}
                key={index}
                onClick={() => setGrade(`中学阶段${index}`)}>
                  <View className="grade-from">六年级-{item}</View>
                  <View className="grade-to">升初一</View>
                </View>
              ))}
            </View>
            <View className="grade-subtitle">高中阶段</View>
            <View className="grade-container">
              {[1, 2].map((item, index) => (
                <View
                className={isSelected('grade-item', formData.grade === `高中阶段${index}`)}
                key={index}
                onClick={() => setGrade(`高中阶段${index}`)}>
                  <View className="grade-from">初三-{item}</View>
                  <View className="grade-to">升高一</View>
                </View>
              ))}
            </View>
          </View>
        );
        break;
      case EditType.CLASS:
        _modalContent = (
          <View className="class-edit">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return (<View
                className={isSelected('class-item', formData.class === `(${item})班`)}
                key={index}
                onClick={() => {
                  setFormData(EditType.CLASS, `(${item})班`);
                  setEditType(EditType.SUBJECT);
                }}>
                  ({item})班
                </View>);
            })}
          </View>
        );
        break;
      case EditType.SUBJECT:
        _modalContent = (
          <View className="subject-edit">
            {['语文', '数学', '英语', '物理', '化学'].map((item, index) => {
              return (<View
                className={isSelected('subject-item', formData.subject === item)}
                key={index}
                onClick={() => {
                  setFormData(EditType.SUBJECT, item);
                  setEditType(EditType.TIME);
                }}>
                  {item}
                </View>);
            })}
          </View>
        );
        break;

      case EditType.TIME:
        _modalContent = (
          <View className="time-edit">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <View
                  className={isSelected('time-item', formData.time === `时间${item}`)}
                  key={index}
                  onClick={() => {
                    setFormData(EditType.TIME, `时间${item}`);
                    setShowModal(false);
                  }}>
                  07月30日-08月20日 | 18:00-21:00 ｜ {item}
                </View>
              );
            })}
          </View>
        );
        break;
    }
    setModalContent(_modalContent);
  }, [editType, formData])

  return (<View className="form">
    <View className="school-name">石狮霞西小学专属公益课</View>
    <View className="form-item">
      <View className="label">学生姓名</View>
      <View className="input">
        <Input type="text" placeholder="请输入孩子的姓名" maxlength={12} onInput={(e) => {
          setFormData('name', e.detail.value);
        }}/>
      </View>
    </View>
    <View className="form-item">
      <View className="label">年级</View>
      <View className="select" onClick={() => {
        setEditType(EditType.GRADE);
        setShowModal(true);
      }}>
        {formData.grade || <span className="default-value">请选择年级</span>}
      </View>
    </View>
    <View className="form-item">
      <View className="label">班级</View>
      <View className="select" onClick={() => {
        setEditType(EditType.CLASS);
        setShowModal(true);
      }}>
        {formData.class || <span className="default-value">请选择班级</span>}
      </View>
    </View>
    <View className="form-item">
      <View className="label">科目</View>
      <View className="select" onClick={() => {
        setEditType(EditType.SUBJECT);
        setShowModal(true);
      }}>
        {formData.subject || <span className="default-value">请选择科目</span>}
      </View>
    </View>
    <View className="form-item">
      <View className="label">上课时间</View>
      <View className="select" onClick={() => {
        setEditType(EditType.GRADE);
        setShowModal(true);
      }}>
        {formData.time || <span className="default-value">请选择上课时间</span>}
      </View>
    </View>
    <View className="form-item">
      <View className="label">选择所在地址</View>
      <View className="select">暂不支持</View>
    </View>
    <Modal visiable={showModal} title={titles[editType]} emitHide={() => setShowModal(false)}>
      {modalContent}
    </Modal>
  </View>);
};

export default FormComponent;
