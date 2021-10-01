import { useDispatch, useSelector } from 'react-redux';

function useUpdateResumeHook() {
  const updatePersonalHook = useUpdatePersonalHook();
  const updateContactHook = useUpdateContactHook();
  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/') || [];
    if (keys[0]) {
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue);
      if (keys[0] === 'contact') updateContactHook(keys[1], stateValue);
    }
  };
}

function useUpdatePersonalHook() {
  const dispatch = useDispatch();
  const base: TSResume.Base = useSelector((state: any) => state.resumeModel.base);

  return <T>(stateKey: string, stateValue: T) => {
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'base',
        value: {
          ...base,
          [stateKey]: stateValue,
        },
      },
    });
  };
}

function useUpdateContactHook() {
  const dispatch = useDispatch();
  const contact: TSResume.Contact = useSelector((state: any) => state.resumeModel.contact);

  return <T>(stateKey: string, stateValue: T) => {
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'contact',
        value: {
          ...contact,
          [stateKey]: stateValue,
        },
      },
    });
  };
}


export default useUpdateResumeHook;
