export interface NodemailerTransporterConfig {
  transport: {
    host: string;
    secure: boolean;
    port?: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  defaults: {
    from: string;
  };
}
