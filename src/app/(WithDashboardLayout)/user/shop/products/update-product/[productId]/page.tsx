import UpdateProductForm from "@/components/modules/shop/products/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

const UpdateProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params
    const { data: product } = await getSingleProduct(productId)
    console.log(product);
    return (
        <div>
            < UpdateProductForm product={product} />
        </div>
    );
};

export default UpdateProductPage;