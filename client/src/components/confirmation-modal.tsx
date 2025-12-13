import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionData: {
    amount: string;
    recipient: string;
    network: string;
    gasFee: string;
  };
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  transactionData,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-sm">
        <DialogHeader>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <DialogTitle className="text-lg font-semibold mb-2">Confirm Transaction</DialogTitle>
            <p className="text-muted-foreground">Please review the transaction details before proceeding</p>
          </div>
        </DialogHeader>
        
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span>{transactionData.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">To:</span>
            <span className="font-mono text-xs">
              {transactionData.recipient.substring(0, 10)}...
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network:</span>
            <span>{transactionData.network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gas Fee:</span>
            <span className="text-yellow-500">{transactionData.gasFee} ETH</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1 bg-secondary hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
