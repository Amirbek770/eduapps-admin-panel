import { useQuery } from "react-query";

import { getPreRegister } from "../../services/api/preregister";

const usePreRegister = (options) => {
  return useQuery('register', () => getPreRegister(options.params), {
    ...options,
  });};

export default usePreRegister;
