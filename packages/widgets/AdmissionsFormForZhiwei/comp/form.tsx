import React, { useState, useEffect, useRef } from "react";
import { Button, View, Image, Input } from "@tarojs/components";
import { showToast } from '@tarojs/taro';
import Modal from './modal';
import { useCallback } from "react";
import { ContentData } from './index';
import { GRADES } from './const';
import { getDetailData } from './api';
import { getGradeById } from './utils';

interface FormProps {
  formData: {
    name: string;
    grade: number;
    subject: number;
    clazz: string;
    time: number;
    address: string;
    contactName: string;
    contactPhone: string;
  };
  constData: ContentData;
  setFormData: (key: string, value: any) => void;
}

type Products = Array<{
  subject_id: number;
  subject_name: string;
  product_list: Array<{
    id: number;
    name: string;
    clazz_name: string;
    type: number;
    subject_id: number;
    time_text: string;
    time_seq: number;
    [key: string]: any;
  }>;
}>;

const FormComponent: React.FC<FormProps> = (props) => {
  const [selectStep, setSelectStep] = useState(1); // 1: 选择年级, 2: 选择课程
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Products>([]);
  const { formData, setFormData } = props;
  const {
    show_institution_name,
    institution_name,
    grades
  } = props.constData;
  const isSelected = useCallback((defaultClass: string, selected: boolean) => selected ? `selected ${defaultClass}` : defaultClass, []);
  const setGrade = useCallback((gradeId: number) => {
    if (gradeId !== formData.grade) {
      setFormData('grade', gradeId);
      setFormData('subject', null);
      setFormData('time', null);
      setProducts([]);
    }
  }, [formData, setFormData]);

  const setSubject = useCallback((subjectId: number) => {
    if (subjectId !== formData.subject) {
      setFormData('subject', subjectId);
      setFormData('time', null);
    }
  }, [formData, setFormData]);

  useEffect(() => {
    console.log('数据变化', formData);
  }, [formData]);

  const onNext = useCallback(async () => {
    if (formData.grade) {
      try {
        const res = await getDetailData(formData.grade);
        setFormData('subject', 0);
        setProducts(res.filter(item => item.product_list?.length > 0));
        setSelectStep(2);
      } catch(err) {
        console.log('获取页面详情失败', err);
      }
      setSelectStep(2);
    }
  }, [formData]);

  const onBefore = useCallback(() => {
    setSelectStep(1);
  }, []);

  const onConfirm = useCallback(() => {
    if (typeof formData.subject !== 'number' || typeof formData.time !== 'number') return;
    setShowModal(false);
  }, [formData]);

  const getSelected = useCallback(() => {
    const gradeInfo = getGradeById(formData.grade);
    const subjectInfo = products[formData.subject];
    const timeInfo = subjectInfo.product_list[formData.time];
    return `${gradeInfo.gradeName} ${subjectInfo.subject_name} ${timeInfo?.time_text}`;
  }, [formData, products]);

  return (<View className="admissions-form">
    {show_institution_name && <View className="school-name">{institution_name}专属公益课</View>}
    <View className="form-item">
      <View className="label">学生姓名</View>
      <View className="input">
        <Input type="text" placeholder="请输入孩子的姓名" maxlength={15} onInput={(e) => {
          setFormData('name', e.detail.value);
        }}/>
      </View>
    </View>
    <View className="form-item">
      <View className="label">选课</View>
      <View className="select select-over" onClick={() => {
        setShowModal(true);
      }}>
        {typeof formData.time === 'number' ? getSelected() : <span className="default-value">请选择报名课程</span>}
      </View>
    </View>
    {props.constData.show_clazz && <View className="form-item">
      <View className={`label ${props.constData.clazz_necessary ? '' : 'no-neseccery'}`}>班级</View>
      <View className="input">
        <Input type="text" placeholder="请输入在校班级" maxlength={15} onInput={(e) => {
          setFormData('clazz', e.detail.value);
        }}/>
      </View>
    </View>}
    <View className="form-item">
      <View className="label">家长联系方式(用于接收“课程材料礼盒”)</View>
      <View className="parent-contact">
        <Input
          className="contact-name"
          type="text"
          placeholder="请输入家长姓名"
          maxlength={15}
          value={formData.contactName}
          onInput={(e) => {
            setFormData('contactName', e.detail.value);
          }}/>
        <Input
          className="contact-name"
          type="text"
          placeholder="请输入手机号"
          maxlength={15}
          value={formData.contactPhone}
          onInput={(e) => {
            setFormData('contactPhone', e.detail.value);
          }}/>
      </View>
    </View>
    <View className="form-item">
      <View className="label">选择所在地址</View>
      <View className="select">暂不支持</View>
    </View>
    {/* 弹窗 */}
    <Modal
      visiable={showModal}
      title="选择报名课程"
      emitHide={() => setShowModal(false)}
    >
      {selectStep === 1 ?
        (<View className="grade-edit">
          {GRADES.map((item) => (item.canShow(grades) && <React.Fragment key={item.subTitle}>
            <View className="grade-subtitle">{item.subTitle}</View>
            <View className="grade-container">
              {item.subItem.map((gradeItem) => (grades.includes(gradeItem.id) ? (
                <View
                  key={gradeItem.gradeName}
                  className={isSelected('grade-item', formData.grade === gradeItem.id)}
                  onClick={() => setGrade(gradeItem.id)}>
                  <View className="grade-from">{gradeItem.gradeName}</View>
                  <View className="grade-to">{gradeItem.gradeSubName}</View>
                </View>
              ) : null))}
            </View>
          </React.Fragment>))}
          <View className="modal-foot">
            <View className={`modal-nxt-btn ${formData.grade ? '' : 'disable-btn'}`} onClick={onNext}>下一步</View>
          </View>
        </View>) : (<View>
          <View className="subject-edit">
            <View>科目</View>
            <View className="subject-container">
              {products.map((item, index) => {
                return (<View
                  className={isSelected('subject-item', formData.subject === index)}
                  key={index}
                  onClick={() => setSubject(index)}>
                    {item.subject_name}
                  </View>);
              })}
            </View>

          </View>
          <View className="time-edit">
            <View>上课时间</View>
            <View className="time-container">
              {products[formData.subject].product_list?.map((item, index) => {
                return (
                  <View
                    className={isSelected('time-item', formData.time === index)}
                    key={item.id}
                    onClick={() => {
                      setFormData('time', index);
                    }}>
                    {item.time_text}
                  </View>
                );
              })}
            </View>
            <View className="modal-foot">
                <View className="modal-bfe-btn" onClick={onBefore}>上一步</View>
                <View className={`modal-confirm-btn ${typeof formData.subject === 'number' && typeof formData.time === 'number' ? '' : 'disable-btn'}`} onClick={onConfirm}>确认</View>
            </View>
          </View>
        </View>)
      }
    </Modal>
  </View>);
};

export default FormComponent;
