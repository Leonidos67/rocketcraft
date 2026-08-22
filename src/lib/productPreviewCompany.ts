export const PRODUCT_PREVIEW_COMPANY_KEY = 'rc-product-preview-company';

export interface ProductPreviewCompany {
  companyName: string;
  productName: string;
  userName: string;
}

export const readProductPreviewCompany = (): ProductPreviewCompany | null => {
  try {
    const raw = sessionStorage.getItem(PRODUCT_PREVIEW_COMPANY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProductPreviewCompany;
    if (!parsed.productName?.trim()) return null;
    return {
      companyName: parsed.companyName?.trim() ?? '',
      productName: parsed.productName.trim(),
      userName: parsed.userName?.trim() ?? '',
    };
  } catch {
    return null;
  }
};

export const saveProductPreviewCompany = (company: ProductPreviewCompany) => {
  sessionStorage.setItem(PRODUCT_PREVIEW_COMPANY_KEY, JSON.stringify(company));
};
