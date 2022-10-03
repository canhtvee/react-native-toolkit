import {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';
import CodePush from 'react-native-code-push';

const _getReleaseInfo = async () => {
  const codePushConfig = await NativeModules.CodePush.getConfiguration();
  const codePushInfo = await CodePush.getUpdateMetadata(
    CodePush.UpdateState.RUNNING,
  );
  return {
    ...codePushConfig,
    ...codePushInfo,
  };
};

export function useReleaseInfo() {
  const [releaseInfo, setReleaseInfo] = useState();

  console.log('releaseInfo', releaseInfo);
  useEffect(() => {
    const checkReleaseInfo = async () => {
      const _releaseInfo = await _getReleaseInfo();
      setReleaseInfo(_releaseInfo);
    };

    checkReleaseInfo();
  }, []);

  return releaseInfo;
}
