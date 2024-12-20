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
  Space,
} from "antd";
import Form from "react-bootstrap/Form";
import { products } from "../utils/axios"; // Import the interceptor
import { Storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for each style
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const { Step } = Steps;

const AddProduct = () => {
  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState("");
  const [percentages, setPercentages] = useState([]); // Track upload progress for multiple files
  const [url, setUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Store all uploaded image URLs
  const [productDetails, setProductDetails] = useState({
    name: "",
    descriptionTitle: "",
    description: "",
    image: url,
    additionalImages: [],
  });
  const [styles, setStyles] = useState([]);
  const [options, setOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  // const [newHeading, setNewHeading] = useState("");
  // const [newDescription, setNewDescription] = useState("");
  // const [headings, setHeadings] = useState([]);
  // const [newImage, setNewImage] = useState("");

  const date = new Date();
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleStyleAdd = () => {
    setStyles((prev) => [
      ...prev,
      { id: uuidv4(), name: "", image: "", sizes: [] },
    ]);
  };

  const handleSizeAdd = (styleIndex) => {
    const updatedStyles = [...styles];
    updatedStyles[styleIndex].sizes.push({
      name: "",
      image: "",
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
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmitimage = (e) => {
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
  const handleDescriptionAdd = () => {
    setDescriptions((prev) => [
      ...prev,
      { title: "", description: "", image: null },
    ]);
  };
  const handleDescriptionChange = (index, field, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index][field] = value; // Update title or description based on field
    setDescriptions(updatedDescriptions);
  };

  const handleDescriptionImageUpload = (e, index) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const showTime = new Date().toISOString(); // Unique timestamp
      const imageDocument = ref(
        Storage,
        `descriptions/${uuidv4()}-${showTime}-${uploadedFile.name}`
      );

      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Upload is ${percent}% done`); // Optional progress log
      });

      uploadTask
        .then(() => {
          return getDownloadURL(imageDocument); // Get the download URL once upload is complete
        })
        .then((url) => {
          const updatedDescriptions = [...descriptions];
          updatedDescriptions[index].image = url; // Set image URL
          setDescriptions(updatedDescriptions); // Update state
          console.log(
            updatedDescriptions,
            "Descriptions updated with image URL"
          );
        })
        .catch((error) => {
          console.log(error.message, "Error uploading the image");
        });
    }
  };
  const handleSubmitmultipleimages = (e) => {
    const files = e.target.files; // Get all selected files
    const urls = []; // Temporary array to store URLs
    const uploadProgress = []; // Temporary array to track progress

    if (files.length > 0) {
      Array.from(files).forEach((file, index) => {
        const date = new Date();
        const showTime =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        const imageDocument = ref(Storage, `images/${file.name + showTime}`);
        const uploadTask = uploadBytesResumable(imageDocument, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            uploadProgress[index] = percent; // Update the specific file's progress
            setPercentages([...uploadProgress]); // Update state with all progress
          },
          (error) => {
            console.log(error.message); // Handle error
          },
          async () => {
            try {
              const url = await getDownloadURL(imageDocument);
              urls.push(url); // Push the URL to the temporary array
              setUploadedImageUrls((prevUrls) => [...prevUrls, url]);
            } catch (error) {
              console.log(error.message, "error getting the image URL");
            }
          }
        );
      });
    }
  };

  const handleSubmitStyleImage = (e, styleIndex) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const showTime = new Date().toISOString(); // Make sure time is unique per upload
      const imageDocument = ref(
        Storage,
        `styles/${uuidv4()}-${showTime}-${uploadedFile.name}`
      );
      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent); // Update the upload progress
      });

      uploadTask
        .then(() => {
          // Get the download URL once upload is complete
          return getDownloadURL(imageDocument);
        })
        .then((url) => {
          // Store the uploaded image URL for the specific style
          const updatedStyles = [...styles];
          updatedStyles[styleIndex] = {
            ...updatedStyles[styleIndex],
            imageUrl: url, // Add image URL to the corresponding style
          };
          setStyles(updatedStyles); // Update the styles state
          console.log(updatedStyles, "dwbhj"); // Log the updated styles array immediately
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
    }
  };
  const handleSubmitSizeImage = (e, styleIndex, sizeIndex) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const showTime = new Date().toISOString(); // Unique timestamp
      const imageDocument = ref(
        Storage,
        `sizes/${uuidv4()}-${showTime}-${uploadedFile.name}`
      );

      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent); // Update the upload progress (optional)
      });

      uploadTask
        .then(() => {
          return getDownloadURL(imageDocument); // Fetch download URL
        })
        .then((url) => {
          // Update the size image in the specific style and size
          const updatedStyles = [...styles];
          updatedStyles[styleIndex].sizes[sizeIndex].imageUrl = url; // Set the image URL
          setStyles(updatedStyles); // Update the styles state
          console.log(updatedStyles, "Updated styles with size image");
        })
        .catch((error) => {
          console.log(error.message, "error uploading size image");
        });
    }
  };
  const handleOptionDetailImageUpload = (e, optionIndex, detailIndex) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const showTime = new Date().toISOString(); // Ensure a unique timestamp
      const imageDocument = ref(
        Storage,
        `options/${uuidv4()}-${showTime}-${uploadedFile.name}`
      );

      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Upload is ${percent}% done`); // Optional progress log
      });

      uploadTask
        .then(() => {
          // Get the download URL once upload is complete
          return getDownloadURL(imageDocument);
        })
        .then((url) => {
          // Update the corresponding option detail with the uploaded image URL
          const updatedOptions = [...options];
          updatedOptions[optionIndex].details[detailIndex].image = url; // Set image URL
          setOptions(updatedOptions); // Update the state
          console.log(updatedOptions, "Options updated with image URL");
        })
        .catch((error) => {
          console.log(error.message, "Error uploading the image");
        });
    }
  };

  const handleSubmit = async () => {
    const productData = {
      title: productDetails.name,
      image: url, // Handle uploading the file to get a URL if needed
      descriptions: [
        {
          descriptionTitle: productDetails.descriptionTitle,
          text: productDetails.description,
          images: uploadedImageUrls, // Upload and use URLs for these
          styles: styles.map((styles) => ({
            name: styles.name,
            image: styles.imageUrl,
            sizes: styles.sizes.map((sizes) => ({
              name: sizes.name,
              image: sizes.imageUrl, // Upload and use URL
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
      productDescription : descriptions.map((item) => ({
        title: item.title,
        image: item.image,
        descriptions: item.description,
      }))
    };

    try {
      const response = await products.post("/", productData); // Replace '/api/products' with your actual endpoint
      console.log("API Response:", response.data);
      message.success("Product saved successfully!");
      setIsModalOpen(false);
      setProductDetails({
        name: "",
        image: "",
        descriptionTitle: "",
        description: "",
        additionalImages: [],
      });
      setStyles([]);
      setOptions([]);
      navigate("/"); // Replace "/all-cloth" with the route for AllCloth1
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
        maskClosable={false}
        footer={null}
        width={800}
      >
        <Steps current={current}>
          <Step title="Product Details" />
          <Step title="Styles" />
          <Step title="Options" />
          <Step title="Product Description" />{" "}
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
                <input type="file" onChange={handlesubmitimage} />
                <img
                  src={url}
                  alt="djehsjd"
                  style={{ width: "5rem", height: "5rem" }}
                />
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
              <input
                type="file"
                multiple
                onChange={handleSubmitmultipleimages}
              />
              <div>
                {uploadedImageUrls.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      style={{ width: "100px", margin: "10px" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                {percentages.map((percent, index) => (
                  <p key={index}>
                    File {index + 1}: {percent}% uploaded
                  </p>
                ))}
              </div>
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
                        {/* Pass styleIndex to handleSubmitStyleImage */}
                        <input
                          type="file"
                          onChange={(e) =>
                            handleSubmitStyleImage(e, styleIndex)
                          }
                        />
                        {style.imageUrl && (
                          <img
                            src={style.imageUrl}
                            alt="Style Preview"
                            style={{
                              width: "5rem",
                              height: "5rem",
                              marginTop: "10px",
                            }}
                          />
                        )}
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
                                  onChange={(e) =>
                                    handleSubmitSizeImage(
                                      e,
                                      styleIndex,
                                      sizeIndex
                                    )
                                  } // Pass the indices
                                />
                                {size.imageUrl && (
                                  <img
                                    src={size.imageUrl}
                                    alt="Style Preview"
                                    style={{
                                      width: "5rem",
                                      height: "5rem",
                                      marginTop: "10px",
                                    }}
                                  />
                                )}
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
                                  onChange={(e) =>
                                    handleOptionDetailImageUpload(
                                      e,
                                      optionIndex,
                                      detailIndex
                                    )
                                  }
                                />
                                {/* Display uploaded image */}
                                {options[optionIndex]?.details[detailIndex]
                                  ?.image && (
                                  <img
                                    src={
                                      options[optionIndex].details[detailIndex]
                                        .image
                                    }
                                    alt="Option Detail"
                                    style={{
                                      width: "5rem",
                                      height: "5rem",
                                      marginTop: "10px",
                                    }}
                                  />
                                )}
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
          {/* Step 4: description */}
          {current === 3 && (
            <div>
              <Button type="dashed" onClick={handleDescriptionAdd}>
                Add Description
              </Button>

              {descriptions.map((desc, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  <Input
                    placeholder="Add Description Title"
                    value={desc.title}
                    onChange={(e) =>
                      handleDescriptionChange(index, "title", e.target.value)
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <Input.TextArea
                    placeholder="Add Description" 
                    value={desc.description}
                    onChange={(e) =>
                      handleDescriptionChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                    style={{ marginBottom: "10px" }}
                  />
                  <input
                    type="file"
                    onChange={(e) => handleDescriptionImageUpload(e, index)}
                    style={{ marginBottom: "10px" }}
                  />
                  {desc.image && (
                    <img
                      src={desc.image}
                      alt="Uploaded"
                      style={{
                        width: "100px",
                        height: "100px",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Button onClick={handlePrev} style={{ marginRight: 8 }}>
              Previous
            </Button>
            <Button
              type="primary"
              onClick={current === 3 ? handleSubmit : handleNext}
            >
              {current === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
