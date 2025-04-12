import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Define the validation schema using Zod
const providerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  serviceCategory: z.string().min(1, 'Please select a service category'),
  location: z.string().min(2, 'Please enter a valid location'),
  status: z.enum(['active', 'pending', 'inactive']),
  verified: z.boolean(),
  description: z.string().optional(),
  avatarUrl: z.string().optional().nullable(),
  hourlyRate: z.number().min(0, 'Hourly rate must be a positive number'),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

interface ProviderFormProps {
  initialData?: Partial<ProviderFormValues>;
  onSubmit: (data: ProviderFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  serviceCategories: string[];
}

const ProviderForm: React.FC<ProviderFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  serviceCategories,
}) => {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      serviceCategory: initialData?.serviceCategory || '',
      location: initialData?.location || '',
      status: initialData?.status || 'pending',
      verified: initialData?.verified || false,
      description: initialData?.description || '',
      avatarUrl: initialData?.avatarUrl || '',
      hourlyRate: initialData?.hourlyRate || 0,
    }
  });
  
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`mt-1 block w-full rounded-md ${
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm sm:text-sm`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1 block w-full rounded-md ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm sm:text-sm`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className={`mt-1 block w-full rounded-md ${
                  errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm sm:text-sm`}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                Profile Image URL
              </label>
              <input
                id="avatarUrl"
                type="text"
                {...register('avatarUrl')}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Service Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Service Information</h3>
            
            <div>
              <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
                Service Category <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceCategory"
                {...register('serviceCategory')}
                className={`mt-1 block w-full rounded-md ${
                  errors.serviceCategory ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm sm:text-sm`}
                disabled={isLoading}
              >
                <option value="">Select a category</option>
                {serviceCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.serviceCategory && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceCategory.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                {...register('location')}
                className={`mt-1 block w-full rounded-md ${
                  errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } shadow-sm sm:text-sm`}
                disabled={isLoading}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                Hourly Rate ($) <span className="text-red-500">*</span>
              </label>
              <Controller
                name="hourlyRate"
                control={control}
                render={({ field }) => (
                  <input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                    className={`mt-1 block w-full rounded-md ${
                      errors.hourlyRate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    } shadow-sm sm:text-sm`}
                    disabled={isLoading}
                  />
                )}
              />
              {errors.hourlyRate && (
                <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                disabled={isLoading}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="verified"
                type="checkbox"
                {...register('verified')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
                Verified Provider
              </label>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
            disabled={isLoading}
          />
        </div>
        
        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            {initialData?.name ? 'Update Provider' : 'Add Provider'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProviderForm;