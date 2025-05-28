package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciTransactionstatus
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseWiadomosciTransactionstatus   {
  @JsonProperty("transaction_id")
  private Integer transactionId = null;

  /**
   * Gets or Sets status
   */
  public enum StatusEnum {
    NOWA("NOWA"),
    
    W_TRAKCIE("W TRAKCIE"),
    
    ZAAKCEPTOWANA("ZAAKCEPTOWANA"),
    
    ANULOWANA("ANULOWANA"),
    
    DOSTAWA_W_TRAKCIE("DOSTAWA W TRAKCIE"),
    
    DOSTAWA_ZAAKCEPTOWANA("DOSTAWA ZAAKCEPTOWANA"),
    
    ZAKO_CZONA("ZAKOŃCZONA");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String text) {
      for (StatusEnum b : StatusEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }
  @JsonProperty("status")
  private StatusEnum status = null;

  @JsonProperty("last_updated")
  private OffsetDateTime lastUpdated = null;

  public ResponseWiadomosciTransactionstatus transactionId(Integer transactionId) {
    this.transactionId = transactionId;
    return this;
  }

  /**
   * Get transactionId
   * @return transactionId
   **/
  @Schema(example = "123", description = "")
  
    public Integer getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(Integer transactionId) {
    this.transactionId = transactionId;
  }

  public ResponseWiadomosciTransactionstatus status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
   **/
  @Schema(example = "W TRAKCIE", description = "")
  
    public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public ResponseWiadomosciTransactionstatus lastUpdated(OffsetDateTime lastUpdated) {
    this.lastUpdated = lastUpdated;
    return this;
  }

  /**
   * Get lastUpdated
   * @return lastUpdated
   **/
  @Schema(example = "2024-03-15T14:30:22Z", description = "")
  
    @Valid
    public OffsetDateTime getLastUpdated() {
    return lastUpdated;
  }

  public void setLastUpdated(OffsetDateTime lastUpdated) {
    this.lastUpdated = lastUpdated;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciTransactionstatus responseWiadomosciTransactionstatus = (ResponseWiadomosciTransactionstatus) o;
    return Objects.equals(this.transactionId, responseWiadomosciTransactionstatus.transactionId) &&
        Objects.equals(this.status, responseWiadomosciTransactionstatus.status) &&
        Objects.equals(this.lastUpdated, responseWiadomosciTransactionstatus.lastUpdated);
  }

  @Override
  public int hashCode() {
    return Objects.hash(transactionId, status, lastUpdated);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciTransactionstatus {\n");
    
    sb.append("    transactionId: ").append(toIndentedString(transactionId)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    lastUpdated: ").append(toIndentedString(lastUpdated)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
