import React, { useState } from "react";
import {
  Modal,
  Steps,
  Button,
  Input,
  Card,
  List,
  InputNumber,
  message,
} from "antd";
import Form from "react-bootstrap/Form";
import { products } from "../utils/axios"; // Import the interceptor
import { Storage } from "../firebase";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const { Step } = Steps;

const AddProduct = () => {
  const [current, setCurrent] = useState(0);
  const [url, setUrl] = useState("");
  const [percent, setPercent] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    descriptionTitle: "",
    description: "",
    image: url,
    additionalImages: [],
  });

  const [styles, setStyles] = useState([]);
  const [options, setOptions] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleStyleAdd = () => {
    setStyles((prev) => [...prev, { name: "", image: null, sizes: [] }]);
  };

  const handleSizeAdd = (styleIndex) => {
    const updatedStyles = [...styles];
    updatedStyles[styleIndex].sizes.push({
      name: "",
      image: null,
      prices: [{ quantity: 0, price: 0 }], // Default quantity-price pair
    });
    setStyles(updatedStyles);
  };

  const handleOptionAdd = () => {
    setOptions((prev) => [...prev, { name: "", details: [] }]);
  };

  const handleOptionDetailAdd = (optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].details.push({ name: "", image: null });
    setOptions(updatedOptions);
  };

  // const handleSubmit = () => {
  //   const productData = {
  //     productDetails,
  //     styles,
  //     options,
  //   };
  //   console.log("Product Data Submitted:", productData);
  //   message.success("Product data saved successfully!");
  //   setIsModalOpen(false);
  //   // Here you can integrate the API call to save this data
  // };
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmit = (e) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const imageDocument = ref(
        Storage,
        `images/${uploadedFile.name + showTime}`
      );
      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      });

      uploadBytes(imageDocument, uploadedFile)
        .then(() => {
          getDownloadURL(imageDocument)
            .then((Url) => {
              setUrl(Url);
              setUploadedImageUrl(Url); // Set the uploaded image URL
              console.log(Url);
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const handleSubmit = async () => {
    const productData = {
      title: productDetails.name,
      image: productDetails.image, // Handle uploading the file to get a URL if needed
      descriptions: [
        {
          descriptionTitle: productDetails.descriptionTitle,
          text: productDetails.description,
          images: productDetails.additionalImages, // Upload and use URLs for these
          styles: styles.map((styles) => ({
            name: styles.name,
            image: styles.image,
            sizes: styles.sizes.map((sizes) => ({
              name: sizes.name,
              image: sizes.image, // Upload and use URL
              quantityPrice: sizes.prices.map((prices) => ({
                quantity: prices.quantity,
                price: prices.price, // Upload and use URL
              })),
            })),
          })),
          options: options.map((option) => ({
            type: option.name,
            cards: option.details.map((detail) => ({
              title: detail.name,
              image: detail.image, // Upload and use URL
            })),
          })),
        },
      ],
    };

    try {
      const response = await products.post("/", productData); // Replace '/api/products' with your actual endpoint
      console.log("API Response:", response.data);
      message.success("Product saved successfully!");
      setIsModalOpen(false);
      // Optionally clear your form state
      setProductDetails({
        name: "",
        image: url,
        descriptionTitle: "",
        description: "",
        additionalImages: [],
      });
      setStyles([]);
      setOptions([]);
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Failed to save product. Please try again.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Product Steps
      </Button>

      <Modal
        title="Add Product"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Steps current={current}>
          <Step title="Product Details" />
          <Step title="Styles" />
          <Step title="Options" />
        </Steps>

        <div style={{ marginTop: 24 }}>
          {/* Step 1: Product Details */}
          {current === 0 && (
            <div>
              <Input
                placeholder="Product Name"
                value={productDetails.name}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                style={{ marginBottom: 10 }}
              />
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Product Image</Form.Label>
                {/* <Form.Control
                  type="file"
                  onChange={(e) =>
                    setProductDetails((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                /> */}
                <input type="file" onChange={handlesubmit} />
              </Form.Group>
              <Input
                placeholder="Description Title"
                value={productDetails.descriptionTitle}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    descriptionTitle: e.target.value,
                  }))
                }
                style={{ marginBottom: 10 }}
              />
              <Input.TextArea
                rows={4}
                placeholder="Description"
                value={productDetails.description}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                style={{ marginBottom: 10 }}
              />
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Additional Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) =>
                    setProductDetails((prev) => ({
                      ...prev,
                      additionalImages: [...e.target.files],
                    }))
                  }
                />
              </Form.Group>
            </div>
          )}

          {/* Step 2: Styles */}
          {current === 1 && (
            <div>
              <Button
                type="dashed"
                onClick={handleStyleAdd}
                block
                style={{ marginBottom: 16 }}
              >
                Add Style
              </Button>

              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={styles}
                renderItem={(style, styleIndex) => (
                  <List.Item>
                    <Card
                      title={
                        <Input
                          placeholder="Style Name"
                          value={style.name}
                          onChange={(e) => {
                            const updatedStyles = [...styles];
                            updatedStyles[styleIndex].name = e.target.value;
                            setStyles(updatedStyles);
                          }}
                          style={{ marginBottom: 10 }}
                        />
                      }
                    >
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Style Image</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => {
                            const updatedStyles = [...styles];
                            updatedStyles[styleIndex].image = e.target.files[0];
                            setStyles(updatedStyles);
                          }}
                        />
                      </Form.Group>
                      <Button
                        type="link"
                        onClick={() => handleSizeAdd(styleIndex)}
                        style={{ marginBottom: 10 }}
                      >
                        Add Size
                      </Button>
                      <List
                        dataSource={style.sizes}
                        renderItem={(size, sizeIndex) => (
                          <List.Item>
                            <div>
                              <Input
                                placeholder="Size Name"
                                value={size.name}
                                onChange={(e) => {
                                  const updatedStyles = [...styles];
                                  updatedStyles[styleIndex].sizes[
                                    sizeIndex
                                  ].name = e.target.value;
                                  setStyles(updatedStyles);
                                }}
                                style={{ marginBottom: 10 }}
                              />
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Size Image</Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(e) => {
                                    const updatedStyles = [...styles];
                                    updatedStyles[styleIndex].sizes[
                                      sizeIndex
                                    ].image = e.target.files[0];
                                    setStyles(updatedStyles);
                                  }}
                                />
                              </Form.Group>

                              <Button
                                type="dashed"
                                onClick={() => {
                                  const updatedStyles = [...styles];
                                  updatedStyles[styleIndex].sizes[
                                    sizeIndex
                                  ].prices.push({
                                    quantity: 0,
                                    price: 0,
                                  });
                                  setStyles(updatedStyles);
                                }}
                                block
                                style={{ marginBottom: 10 }}
                              >
                                Add Quantity-Price
                              </Button>

                              <List
                                dataSource={size.prices}
                                renderItem={(priceItem, priceIndex) => (
                                  <List.Item>
                                    <InputNumber
                                      placeholder="Quantity"
                                      value={priceItem.quantity}
                                      onChange={(value) => {
                                        const updatedStyles = [...styles];
                                        updatedStyles[styleIndex].sizes[
                                          sizeIndex
                                        ].prices[priceIndex].quantity = value;
                                        setStyles(updatedStyles);
                                      }}
                                      style={{ marginRight: 8 }}
                                    />
                                    <InputNumber
                                      placeholder="Price"
                                      value={priceItem.price}
                                      onChange={(value) => {
                                        const updatedStyles = [...styles];
                                        updatedStyles[styleIndex].sizes[
                                          sizeIndex
                                        ].prices[priceIndex].price = value;
                                        setStyles(updatedStyles);
                                      }}
                                    />
                                    <Button
                                      type="text"
                                      danger
                                      onClick={() => {
                                        const updatedStyles = [...styles];
                                        updatedStyles[styleIndex].sizes[
                                          sizeIndex
                                        ].prices.splice(priceIndex, 1);
                                        setStyles(updatedStyles);
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </List.Item>
                                )}
                              />
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          )}

          {/* Step 3: Options */}
          {current === 2 && (
            <div>
              <Button
                type="dashed"
                onClick={handleOptionAdd}
                block
                style={{ marginBottom: 16 }}
              >
                Add Option
              </Button>

              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={options}
                renderItem={(option, optionIndex) => (
                  <List.Item>
                    <Card
                      title={
                        <Input
                          placeholder="Option Name"
                          value={option.name}
                          onChange={(e) => {
                            const updatedOptions = [...options];
                            updatedOptions[optionIndex].name = e.target.value;
                            setOptions(updatedOptions);
                          }}
                          style={{ marginBottom: 10 }}
                        />
                      }
                    >
                      <Button
                        type="link"
                        onClick={() => handleOptionDetailAdd(optionIndex)}
                        style={{ marginBottom: 10 }}
                      >
                        Add Option Detail
                      </Button>
                      <List
                        dataSource={option.details}
                        renderItem={(detail, detailIndex) => (
                          <List.Item>
                            <div>
                              <Input
                                placeholder="Option Detail Name"
                                value={detail.name}
                                onChange={(e) => {
                                  const updatedOptions = [...options];
                                  updatedOptions[optionIndex].details[
                                    detailIndex
                                  ].name = e.target.value;
                                  setOptions(updatedOptions);
                                }}
                                style={{ marginBottom: 10 }}
                              />
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Option Detail Image</Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(e) => {
                                    const updatedOptions = [...options];
                                    updatedOptions[optionIndex].details[
                                      detailIndex
                                    ].image = e.target.files[0];
                                    setOptions(updatedOptions);
                                  }}
                                />
                              </Form.Group>
                            </div>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Button onClick={handlePrev} style={{ marginRight: 8 }}>
              Previous
            </Button>
            <Button
              type="primary"
              onClick={current === 2 ? handleSubmit : handleNext}
            >
              {current === 2 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
