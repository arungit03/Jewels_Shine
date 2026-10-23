export function toStoreProduct(product) {
  return {
    ...product,
    id: String(product.id || "").trim(),
    name: String(product.name || "Untitled jewellery").trim(),
    category: String(product.category || "Chains").trim(),
    price: Number(product.price) || 0,
    images: product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [],
    imageUrl: product.imageUrl || product.images?.[0] || "",
  };
}

export function toFirestoreProduct(product) {
  return {
    id: product.id.trim(),
    name: product.name.trim(),
    price: Number(product.price),
    category: product.category.trim(),
    description: product.description.trim(),
    imageUrl: product.imageUrl.trim(),
  };
}
