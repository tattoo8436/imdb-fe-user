import { Modal, Rate } from "antd";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { movieApi } from "../../apis/movieApi";
import { toast } from "react-toastify";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  hookForm: UseFormReturn<
    {
      movieId: number;
      score: number;
    },
    any,
    undefined
  >;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  userScore: number;
}

const ModalRating = (props: IProps) => {
  const { openModal, setOpenModal, hookForm, setIsRefetch, userScore } = props;

  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    setOpenModal(false);
    hookForm.clearErrors();
    hookForm.setValue("score", userScore);
  };

  const onSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      score: value.score,
      movieId: value.movieId,
    };
    console.log(payload);
    try {
      const { data } = await movieApi.ratingMovie(payload);
      console.log(data);
      setIsRefetch((pre) => !pre);
      setLoading(false);
      setOpenModal(false);
      toast.success("Đánh giá phim thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      className="modal"
      open={openModal}
      onCancel={onCancel}
      centered
      okText="Đánh giá"
      cancelText="Huỷ"
      onOk={hookForm.handleSubmit(onSubmit)}
      okButtonProps={{ loading: loading }}
    >
      <div className="modal__header">Đánh giá phim</div>

      <div className="modal__content">
        <div className="modal__content__rate">
          <Controller
            name="score"
            control={hookForm.control}
            rules={{
              validate: {
                required: (v) => v > 0 || "Vui lòng chọn số sao",
              },
            }}
            render={({ field }) => (
              <Rate {...field} allowClear={false} count={10} />
            )}
          />
          {hookForm.formState.errors.score && (
            <p className="error-msg">
              {hookForm.formState.errors.score.message}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalRating;
