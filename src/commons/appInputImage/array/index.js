import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {useFieldArray} from 'react-hook-form';

import {Sizes} from '@utils';

import {AppLoading} from '../../appView';
import {Status} from '../modules';

import {ImageArraySource} from './ImageArraySource';
import {ImageInputField} from './ImageInputField';

const _space = <View style={{height: Sizes.padding}} />;

export function AppInputImageArray({control, name}) {
  const {fields, remove, append} = useFieldArray({
    control,
    name: name,
  });

  const [imageResourceStatus, setImageResourceStatus] = useState();
  const sourceRef = useRef(null);

  const onOpenSource = () => {
    sourceRef.current.openModal();
  };

  const _fields = [...fields];
  _fields.push(...new Array(9 - fields.length).fill({item: {}}));

  console.log('field', fields);
  console.log('_fields', _fields);
  console.log('imageResourceStatus', imageResourceStatus);

  return (
    <View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {_fields.map((_field, index) => (
          <ImageInputField
            key={`${_field.id}-${index}`}
            onOpenSource={onOpenSource}
            source={_field?.item}
            setImageResourceStatus={setImageResourceStatus}
            remove={() => remove(index)}
          />
        ))}
      </View>
      {(imageResourceStatus === Status.UPLOADING ||
        imageResourceStatus === Status.UPLOAD_SUCCESSUL) && (
        <AppLoading overlay loadingText="Uploading..." />
      )}
      <ImageArraySource
        ref={sourceRef}
        setImageResourceStatus={setImageResourceStatus}
        append={append}
      />
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

const field = [
  {
    id: '349ca459-6f44-4938-9fb0-690f26ecbd1a',
    item: {
      fileName: 'AD45B42E-0903-49CE-A16D-C28F03C404F9.jpg',
      fileSize: 6246673,
      height: 2848,
      imageToServer: 'upload done',
      type: 'image/jpg',
      uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/AD45B42E-0903-49CE-A16D-C28F03C404F9.jpg',
      width: 4288,
    },
  },
  {
    id: '94350419-eab4-41e6-bb9c-acc7f97c3603',
    item: {
      fileName: 'DAA9C95D-5A2B-4C35-A719-DF666BE369A6.jpg',
      fileSize: 3425899,
      height: 2002,
      imageToServer: 'upload done',
      type: 'image/jpg',
      uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/DAA9C95D-5A2B-4C35-A719-DF666BE369A6.jpg',
      width: 3000,
    },
  },
];

const _feilds = [
  {
    id: '349ca459-6f44-4938-9fb0-690f26ecbd1a',
    item: {
      fileName: 'AD45B42E-0903-49CE-A16D-C28F03C404F9.jpg',
      fileSize: 6246673,
      height: 2848,
      imageToServer: 'upload done',
      type: 'image/jpg',
      uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/AD45B42E-0903-49CE-A16D-C28F03C404F9.jpg',
      width: 4288,
    },
  },
  {
    id: '94350419-eab4-41e6-bb9c-acc7f97c3603',
    item: {
      fileName: 'DAA9C95D-5A2B-4C35-A719-DF666BE369A6.jpg',
      fileSize: 3425899,
      height: 2002,
      imageToServer: 'upload done',
      type: 'image/jpg',
      uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/DAA9C95D-5A2B-4C35-A719-DF666BE369A6.jpg',
      width: 3000,
    },
  },
  {item: {}},
  {item: {}},
  {item: {}},
  {item: {}},
];
