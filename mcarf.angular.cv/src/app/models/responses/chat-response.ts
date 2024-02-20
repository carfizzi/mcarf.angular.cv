export interface ChatResponse {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: [{
        index: number,
        message: {
            role: string,
            content: string
        },
        logprobs: string | null,
        finish_reason: string
    }],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    },
    system_fingerprint: string,
}


// { "id": "chatcmpl-8u4FQDeEuf7eviuOYHTu76sK14dC8", "object": "chat.completion", "created": 1708373388, 
// "model": "gpt-3.5-turbo-0125", 
// "choices": [{ "index": 0, "message": { "role": "assistant", 
// "content": "Ciao! Mi chiamo Marco. Come posso aiutarti oggi?" }, "logprobs": null, "finish_reason": "stop" }], 
// "usage": { "prompt_tokens": 92, "completion_tokens": 16, "total_tokens": 108 }, 
// "system_fingerprint": "fp_69829325d0" }