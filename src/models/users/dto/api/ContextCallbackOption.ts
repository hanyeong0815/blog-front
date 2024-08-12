export default interface ContextCallbackOption {
  success?: (responseData?: any) => void;
  onCatch?: (error?: Error) => void;
}
