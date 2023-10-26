import { useRef, useState } from "react";
import { deleteProduct, useProduct } from "~/services/products";
import InfiniteScroll from "react-infinite-scroll-component";
import { timeAgo } from "~/utils";
import { useUserData } from "~/services/settings/userData";
import { Product } from "~/types";
import {
  Button,
  Flex,
  Box,
  Text,
  Spinner,
  VStack,
  Image,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { data: userData } = useUserData();

  const pageSize = 10;
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useProduct({ pageSize });
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    // console.log("selectedProduct", selectedProduct);
    await deleteProduct(selectedProduct.product_id);
    await refetch();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={(products?.pages?.length ?? 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={<></>}
        endMessage={
          <>
            {(products?.pages ?? [])?.flat()?.length > 0 ? (
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                All products displayed
              </Text>
            ) : null}
          </>
        }
      >
        <Flex
          w="100%"
          flexDirection="column"
          justifyContent="center"
          align="center"
          m="auto"
          p="0px"
          gap="20px"
          mt="30px"
        >
          <Box p="4" bg="white" borderRadius="15px" w="100%" textAlign="center">
            <Text fontWeight="700">List of products</Text>
          </Box>
          {products?.pages?.map((page: Product[], index: number) => {
            return (
              <Box key={index} w="100%">
                {page.map((product: Product) => {
                  return (
                    <Box
                      key={product.product_id}
                      bg="white"
                      w="100%"
                      mb="40px"
                      p="8"
                      mt="10px"
                      borderRadius="15px"
                    >
                      <Box>
                        <Image
                          src={product.image_url}
                          fallbackSrc={userData?.profile_picture}
                          alt="product-image"
                          width="100%"
                          height="auto"
                          borderRadius="15px"
                          mt="10px"
                        />
                        <Flex alignItems="center" mt="10px">
                          <Text>{timeAgo(product.created_at)}</Text>
                          <Text fontStyle={"italic"} paddingLeft="20px">
                            {product?.publish === 0 ? (
                              <>
                                <Spinner size="xs" speed="1.1s" />
                                Processing
                              </>
                            ) : (
                              "Published"
                            )}
                          </Text>
                        </Flex>
                        <Text>
                          Product ID: <b>{product.product_id}</b>
                        </Text>
                        <Text>
                          Name: <b>{product.name}</b>
                        </Text>
                        <Text>
                          SKU: <b>{product.sku}</b>
                        </Text>
                        <Text>
                          Product Type: <b>{product.product_type}</b>
                        </Text>
                      </Box>
                      <VStack>
                        <Button
                          mt="10px"
                          w="100%"
                          color="#fff"
                          colorScheme="red"
                          onClick={() => {
                            setSelectedProduct(product);
                            onOpen();
                          }}
                        >
                          <Text>Delete</Text>
                        </Button>
                        <Button
                          mt="10px"
                          w="100%"
                          onClick={() => {
                            navigate(`/product/edit/${product.product_id}`);
                          }}
                        >
                          <Text>Edit</Text>
                        </Button>
                      </VStack>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Flex>
      </InfiniteScroll>

      {selectedProduct && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post: {selectedProduct.name}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    await handleDeleteProduct();
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};

export default ProductList;
