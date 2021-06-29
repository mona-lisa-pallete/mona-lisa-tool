import React, { useState, useEffect, useRef } from "react";
import { Button, View, Image, Input } from "@tarojs/components";
import Taro from '@tarojs/taro';
import Modal from './modal';
import { useCallback } from "react";
import { OfflineData, Products, ProductItem } from './types';
import { GRADES } from './const';
import { getDetailData } from './api';
import { getGradeById, filterProducts } from './utils';

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
  offlineData: OfflineData;
  setFormData: (obj: any) => void;
}

const FormComponent: React.FC<FormProps> = (props) => {
  const [selectStep, setSelectStep] = useState(1); // 1: 选择年级, 2: 选择课程
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Products>([]);
  const { formData, setFormData } = props;
  const {
    show_institution_name,
    institution_name,
    grades
  } = props.offlineData;
  const isSelected = useCallback((defaultClass: string, selected: boolean) => selected ? `selected ${defaultClass}` : defaultClass, []);
  const setGrade = useCallback((gradeId: number) => {
    if (gradeId !== formData.grade) {
      setFormData({
        grade: gradeId,
        time: null,
        skuId: null,
        subject: null,
      });
      setProducts([]);
    }
  }, [formData, setFormData]);

  const setSubject = useCallback((subjectId: number) => {
    if (subjectId !== formData.subject) {
      setFormData({
        time: null,
        skuId: null,
        subject: subjectId,
      });
    }
  }, [formData, setFormData]);

  useEffect(() => {
    console.log('数据变化', formData);
  }, [formData]);

  const onNext = useCallback(async () => {
    if (formData.grade) {
      if (formData.subject === null) {
        try {
          Taro.showLoading();
          const res = await getDetailData(formData.grade);
          setFormData({subject: 0});
          setProducts(filterProducts(res, props.offlineData));
          setSelectStep(2);
        } catch(err) {
          Taro.showToast({
            title: '获取课程数据失败!',
            icon: 'none'
          });
          console.log('获取页面详情失败', err);
        }
        Taro.hideLoading();
      } else {
        // 选择的subject未更改，就不需要重复请求了
        setSelectStep(2);
      }
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

  const sellLimit = useCallback((productItem: ProductItem) => {
    if (productItem.sell_info.sell_limit <= productItem.sell_info.sold_num) {
      return ' oos-status';
    }
    // TODO: 这里要去掉这个测试状态
    return '';
  }, []);

  return (<View className="admissions-form">
    {show_institution_name && <View className="school-name">{institution_name}专属公益课</View>}
    <View className="form-item">
      <View className="label">学生姓名</View>
      <View className="input">
        <Input type="text" placeholder="请输入孩子的姓名" maxlength={15} onInput={(e) => {
          setFormData({name: e.detail.value});
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
    {props.offlineData.show_clazz && <View className="form-item">
      <View className={`label ${props.offlineData.clazz_necessary ? '' : 'no-neseccery'}`}>班级</View>
      <View className="input">
        <Input type="text" placeholder="请输入在校班级" maxlength={15} onInput={(e) => {
          setFormData({clazz: e.detail.value});
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
            setFormData({contactName: e.detail.value});
          }}/>
        <Input
          className="contact-name"
          type="text"
          placeholder="请输入手机号"
          maxlength={15}
          value={formData.contactPhone}
          onInput={(e) => {
            setFormData({contactPhone: e.detail.value});
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
      title={<View>
        <View className="select-title">选择报名课程</View>
        <View className="step-progress">
          <View className="step-name">
            <View className={selectStep === 2 ? 'step' : 'step-active'}>在读年级</View>
            <View className={selectStep === 2 ? 'step-active' : 'step'}>科目&上课</View>
          </View>
          <View className={`step-bar ${selectStep === 2 ? ' step-end' : ''}`}></View>
        </View>
      </View>}
      emitHide={() => setShowModal(false)}
      foot={selectStep === 1 ?
        <View className={`modal-nxt-btn ${formData.grade ? '' : 'disable-btn'}`} onClick={onNext}>下一步</View> :
        <>
          <View className="modal-bfe-btn" onClick={onBefore}>上一步</View>
          <View className={`modal-confirm-btn ${typeof formData.subject === 'number' && typeof formData.time === 'number' ? '' : 'disable-btn'}`} onClick={onConfirm}>确认</View>
        </>
      }
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
        </View>) : (<View>
          <View className="subject-edit">
            <View>科目</View>
            <View className="subject-container">
              {products.map((item, index) => {
                return (<View
                  className={isSelected('subject-item', formData.subject === index) + (item.subjectLimited ? ' oos-status': '')}
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
              {products[formData.subject]?.product_list?.map((item, index) => {
                const ossLimited = sellLimit(item);
                return (
                  <View
                    className={isSelected('time-item', formData.time === index) + ossLimited}
                    key={item.id}
                    onClick={() => {
                      if (!ossLimited) {
                        setFormData({
                          time: index,
                          skuId: item.id,
                        });
                      } else {
                        Taro.showToast({ title: '已报满，请选择其他时间', icon: 'none' });
                      }
                    }}>
                    <span className="time-seq">{item.time_seq}期</span>{item.time_text}{item.material_name ? ` | ${item.material_name}` : ''}
                  </View>
                );
              })}
            </View>
          </View>
        </View>)
      }
    </Modal>
  </View>);
};

export default FormComponent;
