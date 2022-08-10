import React from 'react';
import {View} from 'react-native';
import {useFieldArray} from 'react-hook-form';

import {Constants, Sizes, useAppContext} from '../../../utils';
import {AppButtonNormal} from '../../appButton';
import {ImageInputSource} from '../ImageInputSource';
import {AppImageRemote} from '../../appImage';
import {AppTouchable} from '../../appTouchable';

const _space = <View style={{height: Sizes.padding}} />;

export function AppInputImageArray({control, name}) {
  const {Styles} = useAppContext();
  const [imageReource, setImageResource] = React.useState();
  const sourceRef = React.useRef(null);

  React.useEffect(() => {
    console.log('imageReource', imageReource);

    if (imageReource?.status === Constants.STATUS_SUCCESSFUL) {
      append({item: imageReource.data});
    }
  }, [imageReource]);

  const {fields, prepend, swap, remove, append} = useFieldArray({
    control,
    name: name,
  });

  const _fields = [...fields].concat(
    new Array(6 - fields.length).fill({item: {}}),
  );
  console.log('fields', fields);
  console.log('_fields', _fields);

  return (
    <View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {_fields.map((field, index) => (
          <AppTouchable
            key={index}
            onPress={() => sourceRef.current.openModal()}>
            <AppImageRemote
              source={_resource.data}
              imageStyle={[
                Styles.border,
                {
                  width: Sizes.width(25),
                  height: Sizes.width(25),
                },
              ]}
              onSuccess={() =>
                setImageResource(prev => ({
                  ...prev,
                  status: Constants.STATUS_SUCCESSFUL,
                }))
              }
            />
          </AppTouchable>
        ))}
      </View>

      <AppButtonNormal
        label={'Append'}
        containerStyle={Styles.solidButtonContainer}
        onPress={() => append({item: {}})}
      />
      {_space}

      <AppButtonNormal
        label={'Remove'}
        containerStyle={Styles.solidButtonContainer}
        onPress={() => remove(fields.length - 1)}
      />
      <ImageInputSource ref={sourceRef} setImageResource={setImageResource} />
      {_space}
    </View>
  );
}

const _resource = {
  data: {
    fileName: '0F79FF4C-D1C3-480C-B225-2232C6021833.jpg',
    fileSize: 6246673,
    height: 2848,
    imageToServer: 'upload done',
    type: 'image/jpg',
    uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/0F79FF4C-D1C3-480C-B225-2232C6021833.jpg',
    width: 4288,
  },
  status: 'LOADING',
};
