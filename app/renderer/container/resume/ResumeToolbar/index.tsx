import React, { useEffect, useState } from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import { onAddToolbar, onDeleteToolbar } from '@src/container/resume/ResumeToolbar/utils';
import { useDispatch } from 'react-redux';
import Messager, { MESSAGE_EVENT_NAME } from '@common/messager';

function ResumeToolbar() {
  const dispatch = useDispatch();
  const height = document.body.clientHeight;
  const [addItemList, setAddItemList] = useState<TSResume.SliderItem[]>([]);
  const [unAddItemList, setUnAddItemList] = useState<TSResume.SliderItem[]>([]);
  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let addList: TSResume.SliderItem[] = [];
      let unAddList: TSResume.SliderItem[] = [];

      RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
        if (s.require) addList.push(s);
        if (!s.require) unAddList.push(s);
      });

      setAddItemList(addList);
      setUnAddItemList(unAddList);
      changeToolbarKeys(addItemList.map((s: TSResume.SliderItem) => s.key));
    }
  }, []);
  const changeToolbarKeys = (modulesKeys: string[]) => {
    if (modulesKeys.length > 0) {
      dispatch({
        type: 'templateModel/setStore',
        payload: {
          key: 'resumeToolbarKeys',
          values: modulesKeys,
        },
      });
    }
  };
  // 添加模块
  const onAddSliderAction = (moduleToolbar: TSResume.SliderItem) => {
    const nextAddSliderList = onAddToolbar(addItemList, moduleToolbar);
    setAddItemList(nextAddSliderList);
    const nextUnAddSliderList = onDeleteToolbar(unAddItemList, moduleToolbar);
    setUnAddItemList(nextUnAddSliderList);
    changeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
  };

  // 删除模块
  const onDeleteSliderAction = (moduleSlider: TSResume.SliderItem) => {
    const nextAddSliderList = onDeleteToolbar(addItemList, moduleSlider);
    setAddItemList(nextAddSliderList);
    const nextUnAddSliderList = onAddToolbar(unAddItemList, moduleSlider);
    setUnAddItemList(nextUnAddSliderList);
    changeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
  };

  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        <div styleName="content">
          {!!addItemList.length && (
            <div styleName="module">
              <div styleName="title">
                <span styleName="line" />
                已添加模块
              </div>
              <div styleName="content">
                {addItemList.map((item: TSResume.SliderItem) => {
                  return (
                    <div styleName="box" key={item.key}>
                      <div styleName="info">
                        <i styleName="icon" />
                        <div styleName="text">
                          <div styleName="name">{item.name}</div>
                          <div styleName="summary">{item.summary}</div>
                        </div>
                        <div styleName="action">
                          <i
                            styleName="edit"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              console.log('发送', item.key);
                              Messager.send(MESSAGE_EVENT_NAME.OPEN_FORM_MODAL, {
                                form_name: item.key,
                              });
                            }}
                          />
                          <i
                            styleName="delete"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              if (item.key === 'personal') {
                                alert('必选模块不能删除！');
                                return;
                              }
                              onDeleteSliderAction(item);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {!!unAddItemList.length && (
            <div styleName="module">
              <div styleName="title">
                <span styleName="line" />
                未添加模块
              </div>
              <div styleName="content">
                {unAddItemList.map((item: TSResume.SliderItem) => {
                  return (
                    <div
                      styleName="box"
                      key={item.key}
                      onClick={() => {
                        onAddSliderAction(item);
                      }}
                    >
                      <div styleName="info">
                        <i styleName="icon" />
                        <div styleName="text">
                          <div styleName="name">{item.name}</div>
                          <div styleName="summary">{item.summary}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;
