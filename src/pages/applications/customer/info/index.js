import moment from "moment";

import InfoRow from "../../../../components/InfoRow";
import CustomerImage from "../../../../components/CustomerImage";
import CustomerForm from "../../../../components/Forms/CustomerForm";

import cls from "./style.module.scss";

const CustomerInfo = ({ data, submit }) => {
  console.log('CustomerInfo', data, submit);
  return (
    <div className={cls.containerFluid}>
      {/* <CustomerImage data={data} /> */}

      <div className={cls.container}>
        <InfoRow title={"First name"} value={data?.name} />
        <InfoRow title={"Last name"} value={data?.name} />
        <InfoRow title={"Phone number"} value={data?.phone_number} />
        <InfoRow title={"Age"} value={data?.phone_number} />
        <InfoRow title={"City"} value={data?.infoDevice} />
        <InfoRow title={"E-mail"} value={data?.email} />
        <InfoRow title={"Device Info"} value={data?.infoDevice} />
        <InfoRow title={"Key"} value={data?.key} />
        <InfoRow title={"DeviceID"} value={data?.deviceId} />
        <InfoRow title={"Car number"} value={data?.deviceId} />
        <InfoRow title={"Comment"} value={data?.deviceId} />
        {/* <InfoRow
          title={"Date of birth"}
          value={moment(data?.date).format("HH:mm, yy-MM-DD")}
        /> */}

        <CustomerForm
          data={{
            agent: data?.agent?.code,
          }}
          submit={submit}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
