import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const transactionSchema = z.object({
  recipientAddress: z.string().min(1, 'Recipient address is required'),
  amount: z.string().min(1, 'Amount is required'),
  network: z.string().min(1, 'Network is required'),
  gasSpeed: z.string().default('medium'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  tokenSymbol: string;
  networkOptions: Array<{ value: string; label: string }>;
  isLoading?: boolean;
}

export default function TransactionForm({
  onSubmit,
  tokenSymbol,
  networkOptions,
  isLoading = false,
}: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      recipientAddress: '',
      amount: '',
      network: '',
      gasSpeed: 'medium',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter wallet address"
                    className="bg-primary border-gray-600 focus:border-accent"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">Enter a valid cryptocurrency wallet address</p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="0.00"
                      className="bg-primary border-gray-600 focus:border-accent pr-16"
                      {...field}
                    />
                    <div className="absolute right-3 top-3 text-muted-foreground">
                      {tokenSymbol}
                    </div>
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Available: <span className="text-green-500 font-medium">1.234 {tokenSymbol}</span>
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-primary border-gray-600 focus:border-accent">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {networkOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gasSpeed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Fee Speed</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-primary border-gray-600 focus:border-accent">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="slow">Slow (0.0006 ETH)</SelectItem>
                    <SelectItem value="medium">Medium (0.0009 ETH)</SelectItem>
                    <SelectItem value="fast">Fast (0.0012 ETH)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="text-sm text-muted-foreground">
            <p>Transaction Fee: <span className="text-yellow-500 font-medium">0.0009 ETH</span></p>
            <p>Estimated Time: <span className="text-accent font-medium">2-5 minutes</span></p>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500"
          >
            {isLoading ? 'Processing...' : 'Send Transaction'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
