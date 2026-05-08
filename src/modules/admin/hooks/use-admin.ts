import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminService, type ProductPayload } from "@/modules/admin/services/admin.service";

function useAdminMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<{ message: string }>, keys: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async (response) => {
      toast.success(response.message);
      await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));
    },
  });
}

export function useAdminProducts() {
  return useQuery({ queryKey: ["admin-products"], queryFn: () => adminService.products() });
}

export function useAdminProductActions() {
  return {
    create: useAdminMutation<ProductPayload>(adminService.createProduct, ["admin-products", "products", "dashboard"]),
    update: useAdminMutation<{ id: string; payload: Partial<ProductPayload> }>(
      ({ id, payload }) => adminService.updateProduct(id, payload),
      ["admin-products", "products", "dashboard"]
    ),
    deleteProduct: useAdminMutation<string>(adminService.deleteProduct, ["admin-products", "products", "dashboard"]),
  };
}

export function useAdminCategories() {
  return useQuery({ queryKey: ["admin-categories"], queryFn: adminService.categories });
}

export function useAdminCategoryActions() {
  return {
    create: useAdminMutation<{ name: string; description?: string }>(adminService.createCategory, ["admin-categories", "categories"]),
    deleteCategory: useAdminMutation<string>(adminService.deleteCategory, ["admin-categories", "categories"]),
  };
}

export function useAdminBrands() {
  return useQuery({ queryKey: ["admin-brands"], queryFn: adminService.brands });
}

export function useAdminBrandActions() {
  return {
    create: useAdminMutation<{ name: string; description?: string }>(adminService.createBrand, ["admin-brands", "brands"]),
    deleteBrand: useAdminMutation<string>(adminService.deleteBrand, ["admin-brands", "brands"]),
  };
}

export function useAdminOrders() {
  return useQuery({ queryKey: ["admin-orders"], queryFn: adminService.orders });
}

export function useAdminOrderActions() {
  return {
    updateStatus: useAdminMutation<{ id: string; payload: { status?: string; paymentStatus?: string } }>(
      ({ id, payload }) => adminService.updateOrderStatus(id, payload),
      ["admin-orders", "dashboard", "analytics"]
    ),
  };
}

export function useAdminUsers() {
  return useQuery({ queryKey: ["admin-users"], queryFn: adminService.users });
}

export function useAdminUserActions() {
  return {
    updateRole: useAdminMutation<{ id: string; role: "ADMIN" | "USER" }>(
      ({ id, role }) => adminService.updateUserRole(id, role),
      ["admin-users", "dashboard"]
    ),
    updateStatus: useAdminMutation<{ id: string; isActive: boolean }>(
      ({ id, isActive }) => adminService.updateUserStatus(id, isActive),
      ["admin-users", "dashboard"]
    ),
    deleteUser: useAdminMutation<string>(adminService.deleteUser, ["admin-users", "dashboard"]),
  };
}

export function useAdminReviews() {
  return useQuery({ queryKey: ["admin-reviews"], queryFn: adminService.reviews });
}

export function useAdminReviewActions() {
  return {
    deleteReview: useAdminMutation<string>(adminService.deleteReview, ["admin-reviews"]),
  };
}
