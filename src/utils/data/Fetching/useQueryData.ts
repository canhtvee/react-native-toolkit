import {useState} from 'react';
import {useQuery} from 'react-query';
import {DataService} from './index';

export function useQueryData() {
  // const [dataResource, setDataResource] = useState<FetchResult<dto>>();

  // const onQueryData = async () => {
  //   setDataResource({status: 'loading'});
  //   setTimeout(async () => {
  //     const resource = await DataService.fetchJson();
  //     console.log('resource', resource);
  //     setDataResource(resource);
  //   }, 2000);
  // };

  // return {dataResource, onQueryData};

  const queryReturns = useQuery('data', DataService.fetchJson, {cacheTime: 0});

  return queryReturns;
}
