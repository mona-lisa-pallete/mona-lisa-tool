import React, { useState, useEffect, useRef } from "react";
import { Button, View, Image, Input } from "@tarojs/components";
import Taro from '@tarojs/taro';
import Modal from './DvModal/modal';
import { useCallback } from "react";
import { OfflineData, Products, ProductItem, subjectItem, IFormData, IErrorTip } from './types';
import { GRADES, GRADE_NAMES } from './const';
import { getDetailData } from './api';
import { getGradeById, filterProducts, isNumber } from './utils';
import DvAddress from './DvAddress/index'
import * as trackerAdmissions from './utils/admissionsTracker'

interface FormProps {
  formData: IFormData;
  offlineData: OfflineData;
  setFormData: (obj: any) => void;
  errorTip: IErrorTip;
  setErrorTip: (errorTip: IErrorTip) => void;
}

const FormComponent: React.FC<FormProps> = (props) => {
  const [selectStep, setSelectStep] = useState(1); // 1: 选择年级, 2: 选择课程
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Products>([]);
  /* 本地保存一份课程选择，只有点了确认才同步到界面上 */
  const [localClazzData, setLocalClazzData] = useState({ grade: null, subject: null, time: null, skuId: null });
  const { formData, setFormData, offlineData, errorTip, setErrorTip } = props;
  const {
    show_name,
    institution_name,
    grades
  } = offlineData;
  const isSelected = useCallback((defaultClass: string, selected: boolean) => selected ? `selected ${defaultClass}` : defaultClass, []);
  const setGrade = useCallback((gradeId: number) => {
    if (gradeId !== localClazzData.grade) {
      trackerAdmissions.track_grade_select();
      setLocalClazzData({
        grade: gradeId,
        time: null,
        skuId: null,
        subject: null,
      });
      setProducts([]);
    }
  }, [localClazzData]);

  // 合并本地的缓存数据
  const mergeLocalData = useCallback(async (formData: IFormData, offlineData: OfflineData) => {
      if (offlineData.grades.includes(formData.grade)) {
        const res = await getDetailData(formData.grade);
        const products = filterProducts(res, offlineData);
        const targetSubject = products[formData.subject];
        const targetTime = targetSubject?.product_list[formData.time];
        if (isNumber(formData.skuId) && targetTime?.sell_info.sku_id === formData.skuId) {
          const { sell_limit, sold_num } = targetTime.sell_info;
          if (sell_limit <= sold_num || !sold_num) {
            // 没有库存则取消选中课程
            setFormData({ time: null, skuId: null, product: null });
          }
          return setProducts(products);
        }
      }
      // 如果sku_id对不上，则清除选择项
      setFormData({
        time: null,
        skuId: null,
        subject: null,
        product: null,
      });
  }, [setFormData]);


  useEffect(() => {
    if (isNumber(formData.grade) && isNumber(formData.subject) && products.length === 0 && offlineData.grades?.length > 0) {
      // 这里应该是直接读取缓存的表单数据，此时没有拉取商品信息，需要判断当前sku是否还有效
      mergeLocalData(formData, offlineData);
    }
  }, [formData, offlineData]);

  const setSubject = useCallback((subjectIndex: number, subjectItem: subjectItem) => {
    if (subjectIndex !== localClazzData.subject) {
      trackerAdmissions.track_clazz_select();
      if (!subjectItem.subjectLimited) {
        setLocalClazzData({ ...localClazzData, subject: subjectIndex, time: null, skuId: null });
      } else {
        Taro.showToast({ title: '已报满，请选择其他科目', icon: 'none' });
      }
    }
  }, [localClazzData]);

  const onNext = useCallback(async () => {
    if (selectStep === 2) return;
    if (localClazzData.grade) {
      if (localClazzData.subject === null) {
        try {
          Taro.showLoading();
          const res = await getDetailData(localClazzData.grade);
          const products = filterProducts(res, offlineData);
          setProducts(products);
          const subject = products.findIndex(item => !item.subjectLimited);
          if (subject >= 0) {
            setLocalClazzData({ ...localClazzData, subject });
          }
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
  }, [localClazzData, selectStep]);

  const onBefore = useCallback(() => {
    setSelectStep(1);
  }, []);

  const onConfirm = useCallback(() => {
    if (!isNumber(localClazzData.subject) || !isNumber(localClazzData.time)) return;
    setFormData({ ...localClazzData, product: getSelected() });
    setShowModal(false);
  }, [localClazzData]);

  const getSelected = useCallback(() => {
    try {
      if (products.length > 0) {
        const gradeInfo = getGradeById(localClazzData.grade);
        const subjectInfo = products[localClazzData.subject];
        const timeInfo = subjectInfo.product_list[localClazzData.time];
        return `${GRADE_NAMES[timeInfo.grade_val]} ${subjectInfo.subject_name} ${timeInfo?.time_text}`;
      }
    } catch (err) {
      console.error('拼接具体课程失败', err);
    }
  }, [localClazzData, products]);

  const sellLimit = useCallback((productItem: ProductItem) => {
    if (productItem.sell_info.sell_limit <= productItem.sell_info.sold_num) {
      return ' oos-status';
    }
    return '';
  }, []);
  // 清除错误信息
  const clearErrorTip = useCallback((key: string) => {
    if (errorTip) {
      setErrorTip({ ...errorTip, [key]: null });
    }
  }, [errorTip, setErrorTip]);

  const showModalHandle = useCallback(async () => {
    if (errorTip?.selectTime) clearErrorTip('selectTime');
    // 如果数据选择的年级不一致，则需要重新获取课程数据
    if (isNumber(formData.grade) && isNumber(localClazzData.grade) && formData.grade !== localClazzData.grade) {
      try {
        const res = await getDetailData(formData.grade);
        const products = filterProducts(res, offlineData);
        setProducts(products);
      } catch {
        Taro.showToast({ title: '获取课程数据失败', icon: 'none' });
      }
    }
    setSelectStep(1);
    setLocalClazzData({ time: formData.time, grade: formData.grade, subject: formData.subject, skuId: formData.skuId });
    setShowModal(true);
  }, [formData, localClazzData, offlineData, clearErrorTip]);

  return (<View className="admissions-form">
    <View className="school-name"><span className="text-over">{show_name && institution_name ? `${institution_name}专属公益课` : '填写报读信息'}</span></View>
    <View className="form-item">
      <View className="label">学生姓名</View>
      <View className={`input ${errorTip.name ? 'error-tip' : ''}`} onClick={() => errorTip.name && clearErrorTip('name')}>
        <Input
          onFocus={() => { trackerAdmissions.track_username_input_focus(); }}
          type="text" placeholder="请输入孩子的姓名" maxlength={15} value={formData.name} onInput={(e) => {
            setFormData({name: e.detail.value});
          }}
      />
      </View>
    </View>
    <View className="form-item">
      <View className="label">选课</View>
      <View className={`select select-over ${errorTip.selectTime ? 'error-tip' : ''}`} onClick={showModalHandle}>
        <View onClick={() => { trackerAdmissions.track_pickcourses(); }} className="text-over">{formData.product || <span className="placeholder">请选择报名课程</span>}</View>
      </View>
    </View>
    {offlineData.show_clazz && <View className="form-item">
      <View className={`label ${offlineData.clazz_necessary ? '' : 'no-neseccery'}`}>班级</View>
      <View className={`input ${errorTip.clazz ? 'error-tip' : ''}`} onClick={() => errorTip.clazz && clearErrorTip('clazz')}>
        <Input
          onFocus={() => { trackerAdmissions.track_clazz_input_focus(); }}
          type="text" placeholder="请输入在校班级" value={formData.clazz} maxlength={15} onInput={(e) => {
            setFormData({clazz: e.detail.value});
          }}
        />
      </View>
    </View>}
    <View className="form-item">
      <View className="label">家长联系方式(用于接收“课程材料礼盒”)</View>
      <View className="parent-contact">
        <Input
          className={`contact-name ${errorTip?.contactName ? 'error-tip' : ''}`}
          onClick={() => errorTip?.contactName && clearErrorTip('contactName')}
          type="text"
          placeholder="请输入家长姓名"
          maxlength={15}
          value={formData.contactName}
          onInput={(e) => {
            setFormData({contactName: e.detail.value});
          }}/>
        <Input
          className={`contact-name ${errorTip?.contactPhone ? 'error-tip' : ''}`}
          onClick={() => errorTip?.contactPhone && clearErrorTip('contactPhone')}
          type="number"
          placeholder="请输入手机号"
          maxlength={15}
          value={formData.contactPhone}
          onInput={(e) => {
            setFormData({contactPhone: e.detail.value});
          }}/>
      </View>
    </View>
    <View className="form-item">
      <View className="label">收货地址（开课前将收到课程礼盒）</View>
      <View className="">
        <DvAddress value={formData} onChange={setFormData} errorTip={errorTip} setErrorTip={setErrorTip} />
      </View>
    </View>
    {/* 弹窗 */}
    <Modal
      visiable={showModal}
      title={<View>
        <View className="select-title">选择报名课程</View>
        <View className="step-progress">
          <View className="step-name">
            <View className={selectStep === 2 ? 'step' : 'step-active'} onClick={onBefore}>在读年级</View>
            <View className={selectStep === 2 ? 'step-active' : 'step'} onClick={onNext}>科目&上课</View>
          </View>
          <View className={`step-bar ${selectStep === 2 ? ' step-end' : ''}`}></View>
        </View>
      </View>}
      emitHide={() => setShowModal(false)}
      foot={selectStep === 1 ?
        <View className={`modal-nxt-btn ${localClazzData.grade ? '' : 'disable-btn'}`} onClick={onNext}>下一步</View> :
        <>
          <View className="modal-bfe-btn" onClick={onBefore}>上一步</View>
          <View className={`modal-confirm-btn ${isNumber(localClazzData.subject) && isNumber(localClazzData.time) ? '' : 'disable-btn'}`} onClick={onConfirm}>确认</View>
        </>
      }
    >
      {selectStep === 1 ?
        (<View className="grade-edit">
          {GRADES.map((item) => (item.canShow(grades) && <View className="grade-wrap" key={item.subTitle}>
            <View className="grade-subtitle">{item.subTitle}</View>
            <View className="grade-container">
              {item.subItem.map((gradeItem) => (grades.includes(gradeItem.id) ? (
                <View
                  key={gradeItem.gradeName}
                  className={isSelected('grade-item', localClazzData.grade === gradeItem.id)}
                  onClick={() => setGrade(gradeItem.id)}>
                  <View className="grade-from">{gradeItem.gradeName}</View>
                  <View className="grade-to">{gradeItem.gradeSubName}</View>
                </View>
              ) : null))}
            </View>
          </View>))}
        </View>) : (<View>
          <View className="subject-edit">
            <View className="subject-subtitle">科目</View>
            <View className="subject-container">
              {products.map((item, index) => {
                return (<View
                  className={isSelected('subject-item', localClazzData.subject === index) + (item.subjectLimited ? ' oos-status': '')}
                  key={index}
                  onClick={() => setSubject(index, item)}>
                    {item.subject_name}
                  </View>);
              })}
            </View>
          </View>
          <View className="time-edit">
            <View className="time-subtitle">上课时间</View>
            <View className="time-container">
              {products[localClazzData.subject]?.product_list?.map((item, index) => {
                const ossLimited = sellLimit(item);
                return (
                  <View
                    className={isSelected('time-item', localClazzData.time === index) + ossLimited}
                    key={item.id}
                    onClick={() => {
                      if (!ossLimited) {
                        trackerAdmissions.track_click_courses_time()
                        setLocalClazzData({
                          ...localClazzData,
                          time: index,
                          skuId: item.sell_info.sku_id,
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
