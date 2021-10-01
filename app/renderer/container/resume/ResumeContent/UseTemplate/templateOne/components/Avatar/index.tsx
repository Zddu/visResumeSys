/**
 * @desc 头像
 * @author Zdde
 */
import React from 'react';
import './index.less';
import AvatarImage from '@assets/avatar_real.jpeg';
import uploadIcon from '@assets/icon/upload.png';
import useUpdateResumeHook from '@src/container/resume/ResumeContent/useUpdateResumeHook';
import { useSelector } from 'react-redux';
import ImageUpload from '@common/components/MyUpload/ImageUpload';
import MyButton from '@common/components/MyButton';

function Avatar() {
  const updateResumeHook = useUpdateResumeHook();
  const base: TSResume.Base = useSelector((state: any) => state.resumeModel.base);

  const onUpdateUserAvatar = (url: string) => {
    updateResumeHook<string>('base/avatar', url);
  };

  return (
    <div styleName="box">
      {!base?.avatar && (
        <ImageUpload
          onAfterChange={(files) => {
            onUpdateUserAvatar(files[0]?.base64URL);
          }}
          icon={uploadIcon}
          accept="image/**"
          multiple={false}
        />
      )}
      {base?.avatar && (
        <div styleName="avatar">
          <img src={base?.avatar} />
          <div styleName="mask">
            <MyButton size="small" className="btn-change" onClick={() => onUpdateUserAvatar('')}>
              更换
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
