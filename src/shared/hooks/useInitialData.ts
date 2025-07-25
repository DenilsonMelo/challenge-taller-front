import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

type UseInitialDataProps<
  ResponseData = object,
  ParsedData = object | object[]
> = {
  api: {
    get?: (
      ...rest: any[]
    ) => Promise<AxiosResponse>;
    show?: (id: string) => Promise<AxiosResponse>;
  };
  parser?: (data: ResponseData) => ParsedData;
  id?: string;
};

export function useInitialData<
  ResponseData = object,
  ParsedData = object | object[]
>({
  api,
  parser = (data) => data as unknown as ParsedData,
  id
}: UseInitialDataProps<ResponseData, ParsedData>) {
  const [data, setData] = useState<ParsedData>({} as ParsedData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let response: AxiosResponse<ResponseData> | undefined = undefined;

        if (id && api.show) {
          response = await api.show(id);
        } else if (api.get) {
          response = await api.get();
        }
        if (response) setData(parser(response.data) as ParsedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) getData().finally();
  }, [id, api, isLoading, parser]);

  return { data: data as ParsedData, isLoading };
}