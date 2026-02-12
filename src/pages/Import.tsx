import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDashboard } from "@/contexts/DashboardContext"
import { parseManifests, parseFreightMargins, parsePeople, parseVehicleStatus } from "@/lib/data-processing"
import { cn } from "@/lib/utils"

const ImportPage = () => {
    const { setManifests, setFreightMargins, setPeople, setVehicleStatus } = useDashboard()
    const [isLoading, setIsLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [files, setFiles] = useState<{
        manifest: File | null
        freight: File | null
        people: File | null
        availability: File | null
    }>({
        manifest: null,
        freight: null,
        people: null,
        availability: null,
    })
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files)
        }
    }

    const handleFiles = (fileList: FileList) => {
        const newFiles = { ...files }
        setErrorMsg(null)

        Array.from(fileList).forEach((file) => {
            const name = file.name.toLowerCase()
            if (name.includes("manifesto")) {
                newFiles.manifest = file
            } else if (name.includes("frete_margem")) {
                newFiles.freight = file
            } else if (name.includes("pessoas")) {
                newFiles.people = file
            } else if (name.includes("geral") || name.includes("recados") || name.includes("disponibilidade")) {
                newFiles.availability = file
            } else {
                // Unknown file type warning could be here
            }
        })
        setFiles(newFiles)
    }

    const processFiles = async () => {
        // We allow partial updates if only availability is uploaded, or all files
        const isFullImport = files.manifest && files.freight && files.people
        const isAvailabilityImport = !!files.availability

        if (!isFullImport && !isAvailabilityImport) {
            setErrorMsg("Faça upload dos 3 arquivos principais OU do arquivo de disponibilidade.")
            return
        }

        setIsLoading(true)
        try {
            const promises = []

            if (isFullImport) {
                promises.push(
                    parseManifests(files.manifest!).then(data => setManifests(data)),
                    parseFreightMargins(files.freight!).then(data => setFreightMargins(data)),
                    parsePeople(files.people!).then(data => setPeople(data))
                )
            }

            if (isAvailabilityImport) {
                promises.push(
                    parseVehicleStatus(files.availability!).then(data => setVehicleStatus(data))
                )
            }

            await Promise.all(promises)

            // Alert success
            alert("Dados processados com sucesso!")
        } catch (error) {
            console.error(error)
            setErrorMsg("Erro ao processar os arquivos. Verifique se estão no formato correto.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Importação de Dados</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upload de Arquivos</CardTitle>
                    <CardDescription>
                        Arraste e solte os arquivos CSV para processar.
                        <br />
                        <span className="text-xs text-muted-foreground">Obrigatórios: Manifestos, Frete, Pessoas. Opcional: Geral/Recados (Disponibilidade).</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
                            dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary",
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("file-upload")?.click()}
                    >
                        <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                        <p className="text-sm font-medium text-center">
                            Arraste arquivos aqui ou clique para selecionar
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Suporta apenas .CSV
                        </p>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <FileStatusCard title="Manifestos" file={files.manifest} />
                        <FileStatusCard title="Frete e Margem" file={files.freight} />
                        <FileStatusCard title="Pessoas" file={files.people} />
                        <FileStatusCard title="Disponibilidade" file={files.availability} />
                    </div>

                    {errorMsg && (
                        <div className="mt-4 p-3 bg-destructive/15 text-destructive text-sm rounded-md flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errorMsg}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={processFiles}
                            disabled={isLoading || (!files.manifest && !files.availability)}
                        >
                            {isLoading ? "Processando..." : "Processar Dados"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function FileStatusCard({ title, file }: { title: string, file: File | null }) {
    return (
        <div className={cn("p-4 border rounded-md flex items-center gap-3", file ? "border-green-500 bg-green-500/5" : "border-border")}>
            <div className={cn("p-2 rounded-full", file ? "bg-green-500 text-white" : "bg-muted text-muted-foreground")}>
                {file ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground truncate">{file ? file.name : "Pendente"}</p>
            </div>
        </div>
    )
}

export default ImportPage
